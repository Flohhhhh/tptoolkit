"use client";

import { useState } from "react";
import * as Dynamic from "../responsive";
import { data } from "@/app/components/ServiceAreaReference/ServiceAreas";
import { useMap } from "@/lib/context/mapContext";
import { popModal } from "@/components/dialogs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ServiceAreaRow = {
  name: string;
  oldName?: string;
  id?: string;
  mp: string;
  station: string;
  coords: number[];
};

type ServiceAreaTable = {
  title: string;
  headings: string[];
  rows: ServiceAreaRow[];
};

export default function ServiceAreasDialog() {
  const { flyTo, updateCoordsMarker } = useMap();

  const tables = data.map((table: ServiceAreaTable, index) => (
    <div className="p-4" key={index}>
      <h2 className="mb-4 text-2xl font-bold text-muted-foreground">
        {table.title}
      </h2>
      <div className="rounded-lg border border-accent mb-4 overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="">
              {table.headings.map((heading, index) => (
                <TableHead
                  key={index}
                  className="font-semibold text-muted-foreground"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.rows.map((row, index) => (
              <TableRow
                key={`row-${index}`}
                className="cursor-pointer even:bg-muted/40 hover:bg-muted transition-colors"
                onClick={() => {
                  updateCoordsMarker(row.coords[0], row.coords[1]);
                  flyTo(row.coords[0], row.coords[1]);
                  popModal();
                }}
              >
                {/* Name column is always present */}
                <TableCell className="min-w-fit">{row.name}</TableCell>

                {/* For Parkway Service Areas */}
                {table.headings.includes("Old Name") && (
                  <TableCell className="min-w-fit">
                    {row.oldName || ""}
                  </TableCell>
                )}

                {/* For Turnpike Service Areas */}
                {table.headings.includes("ID") && (
                  <TableCell className="min-w-fit">{row.id || ""}</TableCell>
                )}

                {/* MP and Station are always present */}
                <TableCell>{row.mp}</TableCell>
                <TableCell>{row.station}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ));

  return (
    <Dynamic.default.Content>
      <div className="w-full max-h-[80vh] overflow-y-auto">{tables}</div>
    </Dynamic.default.Content>
  );
}
