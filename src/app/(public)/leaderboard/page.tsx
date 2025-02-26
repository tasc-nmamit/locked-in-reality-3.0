"use client";
import React from "react";
import { api } from "~/trpc/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function LeaderBoard() {
  const {
    data: validatedResult,
    isLoading,
    error,
  } = api.round1.validateRound1Answer.useQuery();

  console.log(validatedResult);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex min-h-screen w-screen items-center justify-center">
      <div className="container mx-auto px-4 py-10 md:px-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
              <Badge variant="outline" className="px-3 py-1">
                Round 1
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table className="mx-auto max-w-4xl text-xl">
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  {/* <TableHead className="w-16 text-center">Rank</TableHead> */}
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="py-3">
                          <Skeleton className="h-6 w-6 rounded-full" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-32" />
                        </TableCell>
                        <TableCell className="text-right">
                          <Skeleton className="ml-auto h-5 w-12" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : validatedResult && validatedResult.length > 0 ? (
                  validatedResult.map((user, index) => (
                    <TableRow
                      key={user.id}
                      className={index < 3 ? "bg-primary/5 font-medium" : ""}
                    >
                      {/* <TableCell className="py-3 text-center">
                        <div className="flex justify-center">
                          {getRankIcon(index)}
                        </div>
                      </TableCell> */}
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span className="tabular-nums">
                            {user.totalPoints}
                          </span>
                          {/* {index > 0 && index < 5 && (
                          <ArrowUp className="h-3 w-3 text-green-500" />
                        )}
                        {index > 10 && (
                          <ArrowDown className="h-3 w-3 text-red-500" />
                        )} */}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="h-24 text-center">
                      No results found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
