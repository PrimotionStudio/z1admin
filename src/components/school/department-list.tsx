"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ChevronRight, GraduationCap } from "lucide-react";
import { getDepartmentsByFacultyId } from "@/functions/Department";
import { Department } from "@/types/Department";

export default function DepartmentList({ facultyId }: { facultyId: string }) {
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    setDepartments(getDepartmentsByFacultyId(facultyId));
  }, [facultyId]);

  if (departments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No departments found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first department
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {departments.map((department, i) => (
        <Link
          href={`/faculties/${facultyId}/departments/${department._id}`}
          key={i}
        >
          <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                {department.name}
              </CardTitle>
              <CardDescription>{department.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <GraduationCap className="mr-1 h-4 w-4" />
                {/* <span>{department.sessions.length} Academic Sessions</span> */}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <div className="flex w-full items-center justify-between text-sm">
                <Badge variant="outline">Department</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
