"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addCourse, getSemesterById } from "@/lib/data";
import { toast } from "@/components/ui/use-toast";

export default function CreateCourseDialog({
  children,
  semesterId,
}: {
  children: React.ReactNode;
  semesterId: string;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [units, setUnits] = useState("3");
  const [lecturerName, setLecturerName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const semester = getSemesterById(semesterId);
      if (!semester) {
        throw new Error("Semester not found");
      }

      addCourse({
        name,
        code,
        units: Number.parseInt(units),
        lecturerName,
        semesterId,
      });

      toast({
        title: "Course created",
        description: `${name} has been successfully added.`,
      });

      // Reset form
      setName("");
      setCode("");
      setUnits("3");
      setLecturerName("");
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>
              Add a new course to this semester.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Introduction to Computer Science"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Course Code</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CS101"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="units">Credit Units</Label>
              <Input
                id="units"
                type="number"
                min="1"
                max="6"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lecturerName">Lecturer Name</Label>
              <Input
                id="lecturerName"
                value={lecturerName}
                onChange={(e) => setLecturerName(e.target.value)}
                placeholder="e.g. Dr. John Smith"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
