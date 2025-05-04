// components/forms/Newsletter.tsx
import React from 'react';

type NewsletterLayoutProps = {
  children: React.ReactNode;
};

const NewsletterLayout: React.FC<NewsletterLayoutProps> = ({ children }) => {
  return (
    <div className="bg-indigo-800 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center text-black">
        {children}
      </div>
    </div>
  );
};

export default NewsletterLayout;