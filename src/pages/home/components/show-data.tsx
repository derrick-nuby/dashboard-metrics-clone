"use client";

import { useState } from "react";
import type { DashboardConverted } from "@/types/dashboardsType";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { FaEye } from "react-icons/fa6";
import { RiCloseLargeFill } from "react-icons/ri";
import { formatDate } from "../../../lib/utils";
import DatePicker from "./date-picker";
import DashboardReport from "./report-dashboard";
import type { DateValueType } from "@/types/dashboard-reportType";
import OrgUnitPicker from "./org-unit-picker";

export interface DataSourceRowProps {
  row: DashboardConverted;
  data: DashboardConverted[];
}

export default function ShowData({ row, data }: DataSourceRowProps) {
  const [open, setOpen] = useState(false);
  const MAX_DATE = new Date();
  const [value, setValue] = useState<DateValueType>(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    return {
      startDate: sevenDaysAgo,
      endDate: today,
    };
  });
  const [selectedOrgUnitPaths, setSelectedOrgUnitPaths] = useState<string[]>([]);

  const handleValueChange = (newValue: DateValueType | null) => {
    setValue(newValue || { startDate: null, endDate: null });
  };

  const handleOrgUnitsChange = (paths: string[], names: string[]) => {
    setSelectedOrgUnitPaths(paths);
  };

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>
        <button className="w-[40px] bg-transparent p-1 focus:outline-none focus:shadow-outline text-stext hover:text-slate-600 hover:bg-transparent">
          <FaEye className="text-xl" />
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[95vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[0px_10px_38px_-10px_rgba(0,0,0,0.35),0px_10px_20px_-15px_rgba(0,0,0,0.2)] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 -mt-4 font-medium">
            <div className="flex justify-between items-center py-2">
              <div className="w-[300px] flex items-start justify-between gap-20 ">
                <DatePicker value={value} onChange={handleValueChange} maxDate={MAX_DATE} />
              </div>
              <div>
                <OrgUnitPicker onOrgUnitsChange={handleOrgUnitsChange} />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                {formatDate(value?.startDate)} - {formatDate(value?.endDate)}
              </h3>
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  className="cursor-pointer text-gray-400 bg-transparent hover:bg-transparent hover:bg-gray-200"
                  data-modal-toggle="default-modal"
                >
                  <RiCloseLargeFill />
                </button>
              </AlertDialog.Cancel>
            </div>
          </AlertDialog.Title>
          <DashboardReport row={row} value={value} selectedOrgUnitPaths={selectedOrgUnitPaths} />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

