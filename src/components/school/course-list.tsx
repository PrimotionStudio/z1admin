"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, User } from "lucide-react";
import { getCoursesBySemesterId } from "@/functions/Course";
import { Course } from "@/types/Course";

export default function CourseList({ semesterId }: { semesterId: string }) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    setCourses(getCoursesBySemesterId(semesterId));
  }, [semesterId]);

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No courses found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first course
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course, i) => (
        <Card key={i} className="h-full overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="mr-2 h-5 w-5 text-muted-foreground" />
              {course.name}
            </CardTitle>
            <CardDescription>{course.code}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Badge variant="outline" className="mr-2">
                  {course.units} {course.units === 1 ? "Unit" : "Units"}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-1 h-4 w-4" />
                <span>Lecturer: {course.lecturer.fullName}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 p-3">
            <div className="flex w-full items-center justify-between text-sm">
              <Badge variant="outline">Course</Badge>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
