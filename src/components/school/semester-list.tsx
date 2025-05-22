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
import { getSemestersBySessionId } from "@/functions/Semester";
import { Semester } from "@/types/Semester";

export default function SemesterList({ sessionId }: { sessionId: string }) {
  const [semesters, setSemesters] = useState<Semester[]>([]);

  useEffect(() => {
    setSemesters(getSemestersBySessionId(sessionId));
  }, [sessionId]);

  if (semesters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No semesters found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first semester
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {semesters.map((semester, i) => (
        <Link
          href={`/faculties/${"semester.facultyId"}/departments/${"semester.departmentId"}/sessions/${semester.sessionId}/semesters/${semester._id}`}
          key={i}
        >
          <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
                {semester.name}
              </CardTitle>
              <CardDescription>Semester</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <GraduationCap className="mr-1 h-4 w-4" />
                {/* <span>{semester.courses.length} Courses</span> */}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <div className="flex w-full items-center justify-between text-sm">
                <Badge variant="outline">Semester</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
