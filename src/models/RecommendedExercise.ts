export interface RecommendedExerciseModel {
  id: number;
  title: string;
  difficultyLevel: string;
  maxPoints: number;
  exerciseType: string;
}

export const mapRecommendedExerciseResponse = (
  data: any
): RecommendedExerciseModel[] => {
  if (!Array.isArray(data)) return [];

  return data.map((item) => ({
    id: item?.id ?? 0,
    title: item?.title ?? "",
    difficultyLevel: item?.difficultyLevel ?? "",
    maxPoints: item?.maxPoints ?? 0,
    exerciseType: item?.exerciseType ?? "",
  }));
};
