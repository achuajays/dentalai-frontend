
import { Exercise, ExerciseResponse } from "@/types/Exercise";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ExerciseResultsProps {
  data: ExerciseResponse | null;
  isLoading: boolean;
  error: Error | null;
  bodyPart: string;
}

export function ExerciseResults({ data, isLoading, error, bodyPart }: ExerciseResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="py-6">
          <p className="text-red-700">Error: {error.message}</p>
          <p className="text-gray-700 mt-2">Please try a different body part or try again later.</p>
        </CardContent>
      </Card>
    );
  }

  if (!data || data.data.length === 0) {
    return bodyPart ? (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="py-6">
          <p className="text-gray-700">No exercises found for "{bodyPart}". Please try a different body part.</p>
        </CardContent>
      </Card>
    ) : null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-blue-700">
          Exercises for {data.bodypart}
        </h2>
        <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
          {data.data.length} results
        </Badge>
      </div>

      <div className="space-y-6">
        {data.data.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
}

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 pb-4">
        <CardTitle className="flex justify-between items-start">
          <div>
            <h3 className="text-xl text-blue-700">{exercise.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-blue-50">
                {exercise.target}
              </Badge>
              <Badge variant="outline" className="bg-gray-50">
                {exercise.equipment}
              </Badge>
            </div>
          </div>
          <div className="bg-white p-2 rounded-full shadow-sm">
            <Dumbbell className="h-5 w-5 text-blue-500" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex gap-4 mb-4">
          <div className="w-1/3 md:w-1/4 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            <img 
              src={exercise.gifUrl} 
              alt={`${exercise.name} demonstration`} 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-2/3 md:w-3/4">
            <h4 className="text-sm font-semibold text-gray-700 mb-1">Secondary muscles:</h4>
            <div className="flex flex-wrap gap-1 mb-3">
              {exercise.secondaryMuscles.map((muscle, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {muscle}
                </Badge>
              ))}
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="instructions" className="border-none">
                <AccordionTrigger className="py-1 text-blue-600 hover:text-blue-800">
                  <span className="text-sm font-medium">Instructions</span>
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 pl-2">
                    {exercise.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
