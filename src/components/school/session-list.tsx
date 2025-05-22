"use client";

import { CardFooter } from "@/components/ui/card";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { getSessionsByDepartmentId } from "@/functions/Session";
import { Session } from "@/types/Session";

export default function SessionList({
  departmentId,
}: {
  departmentId: string;
}) {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    setSessions(getSessionsByDepartmentId(departmentId));
  }, [departmentId]);

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No academic sessions found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first academic session
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sessions.map((session, i) => (
        <Link
          href={`/faculties/${"session.facultyId"}/departments/${session.departmentId}/sessions/${session._id}`}
          key={i}
        >
          <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                {session.name}
              </CardTitle>
              <CardDescription>Academic Session</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(session.startDate).toLocaleDateString()} -{" "}
                    {new Date(session.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <div className="flex w-full items-center justify-between text-sm">
                <Badge variant="outline">Academic Session</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
