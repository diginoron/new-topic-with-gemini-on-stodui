import React, { useState } from 'react';
import { InputFormProps } from '../types';

const InputForm: React.FC<InputFormProps> = ({ onGenerateTopics, isLoading }) => {
  const [keywords, setKeywords] = useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (keywords.trim() && !isLoading) {
      onGenerateTopics(keywords);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-xl mb-10 border border-gray-100">
      <div className="mb-6">
        <label htmlFor="keywords" className="block text-gray-800 text-xl font-bold mb-4">
          کلمات کلیدی خود را وارد کنید:
        </label>
        <textarea
          id="keywords"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 ease-in-out resize-y min-h-[150px] max-h-[300px] text-gray-700 placeholder-gray-400 text-lg leading-relaxed"
          rows={5}
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="مثال: هوش مصنوعی، یادگیری ماشین، تشخیص تصویر، پردازش زبان طبیعی"
          required
          disabled={isLoading}
          aria-label="کلمات کلیدی برای تولید موضوع پایان‌نامه"
        ></textarea>
        <p className="text-sm text-gray-500 mt-2">
          لطفاً کلمات کلیدی مرتبط با حوزه پایان‌نامه خود را وارد کنید.
        </p>
      </div>
      <button
        type="submit"
        className={`w-full py-4 px-6 rounded-xl text-white text-xl font-bold tracking-wide transition-all duration-300 ease-in-out transform hover:scale-105
          ${isLoading
            ? 'bg-blue-300 cursor-not-allowed flex items-center justify-center'
            : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2'
          }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -mr-1 ml-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال تولید موضوعات...
          </>
        ) : (
          'تولید موضوعات پایان‌نامه'
        )}
      </button>
    </form>
  );
};

export default InputForm;