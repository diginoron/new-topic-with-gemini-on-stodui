export type Topic = string;

export interface TopicSuggestionState {
  topics: Topic[];
  loading: boolean;
  error: string | null;
}

export interface InputFormProps {
  onGenerateTopics: (keywords: string) => void;
  isLoading: boolean;
}

export interface TopicListProps {
  topics: Topic[];
}

export interface ErrorMessageProps {
  message: string;
}
