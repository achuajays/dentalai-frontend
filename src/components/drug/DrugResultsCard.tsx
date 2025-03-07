
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill, ArrowDown, ArrowUp, Calendar, Box, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type DrugInfo = {
  product_ndc: string;
  generic_name: string;
  labeler_name: string;
  active_ingredients: { name: string; strength: string }[];
  dosage_form: string;
  product_type: string;
  brand_name_base: string | null;
  marketing_start_date: string;
  packaging: { description: string; marketing_start_date: string }[];
  marketing_category: string;
  listing_expiration_date: string;
};

export function DrugResultsCard({ drug }: { drug: DrugInfo }) {
  const [expanded, setExpanded] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString || dateString.length !== 8) return "Unknown";
    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="overflow-hidden border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white rounded-full shadow-sm">
              <Pill className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl text-blue-800">
                {drug.brand_name_base || drug.generic_name}
              </CardTitle>
              {drug.brand_name_base && <p className="text-sm text-gray-600 mt-1">{drug.generic_name}</p>}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Show less" : "Show more"}
          >
            {expanded ? <ArrowUp className="h-5 w-5" /> : <ArrowDown className="h-5 w-5" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Manufacturer</p>
              <p>{drug.labeler_name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">NDC</p>
              <p>{drug.product_ndc}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">Active Ingredients</p>
            <ul className="list-disc pl-5 space-y-1">
              {drug.active_ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-medium">{ingredient.name}</span> ({ingredient.strength})
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Dosage Form</p>
              <p>{drug.dosage_form}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-500">Marketing Category</p>
              <p>{drug.marketing_category}</p>
            </div>
          </div>

          {expanded && (
            <>
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">Important Dates</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-gray-500">Marketing Start Date</p>
                    <p>{formatDate(drug.marketing_start_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Listing Expiration Date</p>
                    <p>{formatDate(drug.listing_expiration_date)}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Box className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">Packaging Information</p>
                </div>
                <div className="pl-6">
                  {drug.packaging && drug.packaging.length > 0 ? (
                    <ul className="space-y-2">
                      {drug.packaging.map((pkg, index) => (
                        <li key={index} className="text-sm">
                          <p>{pkg.description}</p>
                          {pkg.marketing_start_date && (
                            <p className="text-xs text-gray-500">
                              Marketing start date: {formatDate(pkg.marketing_start_date)}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No packaging information available</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <p className="text-sm font-medium text-gray-700">Additional Information</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                  <div>
                    <p className="text-sm text-gray-500">Product Type</p>
                    <p>{drug.product_type}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
