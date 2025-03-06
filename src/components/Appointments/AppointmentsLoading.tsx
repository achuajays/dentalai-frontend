
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const AppointmentsLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <Card key={index} className="h-full">
          <CardHeader className="pb-2">
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-3"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AppointmentsLoading;
