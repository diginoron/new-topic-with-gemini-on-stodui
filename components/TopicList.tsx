import React from 'react';
import { TopicListProps } from '../types';

const TopicList: React.FC<TopicListProps> = ({ topics }) => {
  if (topics.length === 0) return null;

  return (
    <div className="p-8 bg-white rounded-xl shadow-xl border border-gray-100 mt-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        موضوعات پیشنهادی پایان‌نامه:
      </h2>
      <ol className="list-decimal space-y-5 pl-6 pr-8 marker:text-blue-600 marker:font-bold">
        {topics.map((topic, index) => (
          <li key={index} className="text-gray-800 text-xl leading-relaxed bg-blue-50 p-5 rounded-lg shadow-md border border-blue-100 hover:bg-blue-100 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-default">
            {topic}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default TopicList;