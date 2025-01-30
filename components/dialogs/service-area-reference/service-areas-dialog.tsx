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
      <h2 className="mb-4 text-2xl font-bold text-zinc-700 dark:text-zinc-300">
        {table.title}
      </h2>
      <div className="rounded-lg border border-zinc-200 dark:border-zinc-600 mb-4 overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-100 dark:bg-zinc-800">
            <TableRow className="hover:bg-zinc-100 dark:hover:bg-zinc-800">
              {table.headings.map((heading, index) => (
                <TableHead
                  key={index}
                  className="font-semibold text-zinc-900 dark:text-zinc-100"
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
                className="cursor-pointer even:bg-zinc-50 dark:even:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-700/70 transition-colors"
                onClick={() => {
                  updateCoordsMarker(row.coords[0], row.coords[1]);
                  flyTo(row.coords[0], row.coords[1]);
                  popModal();
                }}
              >
                {/* Name column is always present */}
                <TableCell>{row.name}</TableCell>

                {/* For Parkway Service Areas */}
                {table.headings.includes("Old Name") && (
                  <TableCell>{row.oldName || ""}</TableCell>
                )}

                {/* For Turnpike Service Areas */}
                {table.headings.includes("ID") && (
                  <TableCell>{row.id || ""}</TableCell>
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
