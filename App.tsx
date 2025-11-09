import React, { useState, useCallback } from 'react';
import { generateTopicSuggestions } from './services/avalaiService';
import { Topic, TopicSuggestionState } from './types';
import InputForm from './components/InputForm';
import TopicList from './components/TopicList';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [appState, setAppState] = useState<TopicSuggestionState>({
    topics: [],
    loading: false,
    error: null,
  });

  const handleGenerateTopics = useCallback(async (keywords: string) => {
    setAppState(prevState => ({ ...prevState, loading: true, error: null, topics: [] }));
    try {
      const generatedTopics: Topic[] = await generateTopicSuggestions(keywords);
      setAppState(prevState => ({ ...prevState, topics: generatedTopics }));
    } catch (err: any) {
      console.error("Failed to generate topics:", err);
      setAppState(prevState => ({ ...prevState, error: err.message || "خطایی رخ داد. لطفاً دوباره تلاش کنید." }));
    } finally {
      setAppState(prevState => ({ ...prevState, loading: false }));
    }
  }, []); // Empty dependency array ensures this callback is created only once.

  return (
    <div className="container mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-2xl border-b-4 border-blue-600 max-w-5xl">
      <h1 className="text-4xl md:text-6xl font-extrabold text-center text-gray-900 mb-10 md:mb-14 leading-tight">
        <span className="block text-blue-600">مولد موضوع پایان‌نامه</span> با هوش مصنوعی
      </h1>

      <InputForm
        onGenerateTopics={handleGenerateTopics}
        isLoading={appState.loading}
      />

      <ErrorMessage message={appState.error} />

      <TopicList topics={appState.topics} />

      {appState.loading && appState.topics.length === 0 && !appState.error && (
        <div className="flex items-center justify-center mt-10 text-xl text-blue-600 font-semibold">
          <svg className="animate-spin -mr-1 ml-3 h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          در حال تولید موضوعات...
        </div>
      )}
    </div>
  );
};

export default App;