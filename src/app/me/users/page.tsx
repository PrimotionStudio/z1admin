"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Search } from "lucide-react";
import { Application } from "@/types/Application";
import { formatDate } from "@/lib/utils";
import { LoggedInUser } from "@/types/User";
import { changeUserRole, getAllUsers } from "@/functions/User";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<LoggedInUser[]>([]);

  useEffect(() => {
    getAllUsers()
      .then((users) => setUsers(users))
      .catch((error) => undefined);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch;
  });

  return (
    <div className="container mx-auto py-10 px-4">
      <Tabs defaultValue="allUsers">
        <TabsList className="bg-white border">
          <TabsTrigger value="students">
            <h1>Students</h1>
          </TabsTrigger>
          <TabsTrigger value="allUsers">
            <h1>All Users</h1>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>All Students</CardTitle>
              <CardDescription>
                View and manage all registered students. Use the filters to
                narrow down results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or  ..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fullname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone number</TableHead>
                      <TableHead>Created at</TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, i) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell>{user.fullName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            {user.role}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No user found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="allUsers">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>All Users</CardTitle>
              <CardDescription>
                View and manage all registered users. Use the filters to narrow
                down results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or  ..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Fullname</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone number</TableHead>
                      <TableHead>Created at</TableHead>
                      <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, i) => (
                        <TableRow key={user._id}>
                          <TableCell className="font-medium">{i + 1}</TableCell>
                          <TableCell>{user.fullName}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{formatDate(user.createdAt)}</TableCell>
                          <TableCell className="text-right">
                            {user.role === "User" ? (
                              <Select
                                value={user.role}
                                onValueChange={async (v) => {
                                  await changeUserRole(
                                    user._id,
                                    v as LoggedInUser["role"],
                                  )
                                    .then((message) => toast.success(message))
                                    .catch((error) =>
                                      toast.error((error as Error).message),
                                    );
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u._id === user._id
                                        ? {
                                            ...u,
                                            role: v as LoggedInUser["role"],
                                          }
                                        : u,
                                    ),
                                  );
                                }}
                              >
                                <SelectTrigger className="ml-auto">
                                  <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="User" disabled>
                                    User
                                  </SelectItem>
                                  <SelectItem value="Exam Officer">
                                    Exams Officer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            ) : (
                              user.role
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No user found matching your filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
