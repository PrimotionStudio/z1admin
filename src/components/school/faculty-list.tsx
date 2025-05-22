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
import { Building2, ChevronRight, Layers } from "lucide-react";
import { getAllFaculties } from "@/functions/Faculty";
import { Faculty } from "@/types/Faculty";

export default function FacultyList() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);

  useEffect(() => {
    setFaculties(getAllFaculties());
  }, []);

  if (faculties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No faculties found</h3>
        <p className="text-muted-foreground mt-1">
          Get started by creating your first faculty
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {faculties.map((faculty, i) => (
        <Link href={`/faculties/${faculty._id}`} key={i}>
          <Card className="h-full overflow-hidden transition-all hover:border-primary hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-xl">
                <Building2 className="mr-2 h-5 w-5 text-muted-foreground" />
                {faculty.name}
              </CardTitle>
              <CardDescription>{faculty.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Layers className="mr-1 h-4 w-4" />
                {/* <span>{faculty.departments.length} Departments</span> */}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 p-3">
              <div className="flex w-full items-center justify-between text-sm">
                <Badge variant="outline">Faculty</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
