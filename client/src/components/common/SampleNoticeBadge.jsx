import React from 'react';
import { Info } from 'lucide-react';

const SampleNoticeBadge = ({ text = "Sample Showcase", className = "" }) => {
  return (
    <div className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] uppercase font-semibold tracking-wider bg-black/60 backdrop-blur-md text-pink-200 border border-pink-300/30 ${className}`}>
      <Info className="w-3 h-3 mr-1 text-pink-300" />
      <span>{text}</span>
    </div>
  );
};

export default SampleNoticeBadge;
