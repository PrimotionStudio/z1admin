"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SchoolFee {
  name: string;
  amount: number;
}

interface FeeData {
  applicationFee: number;
  schoolFees: SchoolFee[];
}

export default function FeeManagement() {
  const [feeData, setFeeData] = useState<FeeData>({
    applicationFee: 0,
    schoolFees: [{ name: "", amount: 0 }],
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleApplicationFeeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number.parseFloat(e.target.value) || 0;
    setFeeData({ ...feeData, applicationFee: value });

    if (value <= 0) {
      setErrors({
        ...errors,
        applicationFee: "Application fee must be greater than 0",
      });
    } else {
      const { applicationFee, ...restErrors } = errors;
      setErrors(restErrors);
    }
  };

  const handleSchoolFeeChange = (
    index: number,
    field: keyof SchoolFee,
    value: string,
  ) => {
    const updatedFees = [...feeData.schoolFees];

    if (field === "name") {
      updatedFees[index].name = value;

      if (!value.trim()) {
        setErrors({
          ...errors,
          [`schoolFees.${index}.name`]: "Fee name is required",
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors[`schoolFees.${index}.name`];
        setErrors(newErrors);
      }
    } else if (field === "amount") {
      const amount = Number.parseFloat(value) || 0;
      updatedFees[index].amount = amount;

      if (amount <= 0) {
        setErrors({
          ...errors,
          [`schoolFees.${index}.amount`]: "Amount must be greater than 0",
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors[`schoolFees.${index}.amount`];
        setErrors(newErrors);
      }
    }

    setFeeData({ ...feeData, schoolFees: updatedFees });
  };

  const addSchoolFee = () => {
    setFeeData({
      ...feeData,
      schoolFees: [...feeData.schoolFees, { name: "", amount: 0 }],
    });
  };

  const removeSchoolFee = (index: number) => {
    if (feeData.schoolFees.length > 1) {
      const updatedFees = feeData.schoolFees.filter((_, i) => i !== index);
      setFeeData({ ...feeData, schoolFees: updatedFees });

      // Remove any errors for this index
      const newErrors = { ...errors };
      Object.keys(newErrors).forEach((key) => {
        if (key.includes(`schoolFees.${index}`)) {
          delete newErrors[key];
        }
      });
      setErrors(newErrors);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (feeData.applicationFee <= 0) {
      newErrors.applicationFee = "Application fee must be greater than 0";
    }

    feeData.schoolFees.forEach((fee, index) => {
      if (!fee.name.trim()) {
        newErrors[`schoolFees.${index}.name`] = "Fee name is required";
      }

      if (fee.amount <= 0) {
        newErrors[`schoolFees.${index}.amount`] =
          "Amount must be greater than 0";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // await saveFees(feeData)
      setSuccessMessage("Fees saved successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving fees:", error);
      setErrors({ ...errors, form: "Failed to save fees. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">School Portal Fee Management</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Set School Fees</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Application Fee */}
              <div className="space-y-2">
                <Label htmlFor="applicationFee">Application Fee</Label>
                <Input
                  id="applicationFee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={feeData.applicationFee || ""}
                  onChange={handleApplicationFeeChange}
                  className={errors.applicationFee ? "border-red-500" : ""}
                />
                {errors.applicationFee && (
                  <p className="text-sm text-red-500">
                    {errors.applicationFee}
                  </p>
                )}
              </div>

              {/* School Fees */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">School Fees</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addSchoolFee}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Fee
                  </Button>
                </div>

                {feeData.schoolFees.map((fee, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] gap-4 items-end"
                  >
                    <div className="space-y-2">
                      <Label htmlFor={`feeName-${index}`}>Fee Name</Label>
                      <Input
                        id={`feeName-${index}`}
                        value={fee.name}
                        onChange={(e) =>
                          handleSchoolFeeChange(index, "name", e.target.value)
                        }
                        className={
                          errors[`schoolFees.${index}.name`]
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors[`schoolFees.${index}.name`] && (
                        <p className="text-sm text-red-500">
                          {errors[`schoolFees.${index}.name`]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`feeAmount-${index}`}>Amount</Label>
                      <Input
                        id={`feeAmount-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={fee.amount || ""}
                        onChange={(e) =>
                          handleSchoolFeeChange(index, "amount", e.target.value)
                        }
                        className={
                          errors[`schoolFees.${index}.amount`]
                            ? "border-red-500"
                            : ""
                        }
                      />
                      {errors[`schoolFees.${index}.amount`] && (
                        <p className="text-sm text-red-500">
                          {errors[`schoolFees.${index}.amount`]}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSchoolFee(index)}
                      disabled={feeData.schoolFees.length <= 1}
                    >
                      <Trash2 className="h-5 w-5 text-red-500" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>

              {errors.form && (
                <p className="text-sm text-red-500">{errors.form}</p>
              )}

              {successMessage && (
                <p className="text-sm text-green-500 font-medium">
                  {successMessage}
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Saving..." : "Save Fees"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Fee Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fee Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Application Fee</TableCell>
                  <TableCell className="text-right">
                    ${feeData.applicationFee.toFixed(2)}
                  </TableCell>
                </TableRow>
                {feeData.schoolFees.map(
                  (fee, index) =>
                    fee.name && (
                      <TableRow key={index}>
                        <TableCell>{fee.name}</TableCell>
                        <TableCell className="text-right">
                          ${fee.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ),
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
