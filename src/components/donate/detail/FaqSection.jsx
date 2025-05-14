import React, { useState } from 'react';
import { FaRegQuestionCircle, FaChevronDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FaqSection = ({ faqs }) => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Toggle FAQ expansion
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 text-lg mb-5 flex items-center">
        <div className="p-2 bg-purple-50 rounded-full mr-3">
          <FaRegQuestionCircle className="text-purple-600" />
        </div>
        Câu hỏi thường gặp
      </h3>
      
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`border rounded-xl overflow-hidden transition-all duration-200 ease-in-out
              ${expandedFaq === faq.id ? 'border-purple-200 shadow-sm' : 'border-gray-200 hover:border-purple-200 hover:shadow-sm'}`}
          >
            <div
              className={`p-4 cursor-pointer flex justify-between items-center transition-colors duration-200 ease-in-out hover:bg-purple-50/50`}
              onClick={() => toggleFaq(faq.id)}
              aria-expanded={expandedFaq === faq.id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleFaq(faq.id)}
            >
              <h4 className="font-medium text-gray-800">{faq.question}</h4>
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${expandedFaq === faq.id ? 'bg-purple-200 text-purple-700' : 'bg-gray-100 text-gray-500'}`}
                style={{ transform: expandedFaq === faq.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <FaChevronDown />
              </div>
            </div>

            {expandedFaq === faq.id && (
              <div className="border-t border-gray-100 overflow-hidden">
                <div className="p-4 bg-white">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Extra help link */}
      <div className="mt-5 pt-4 border-t border-gray-100 text-center">
        <Link to="/faq" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
          <FaRegQuestionCircle className="mr-2" />
          Xem thêm câu hỏi khác
        </Link>
      </div>
    </div>
  );
};

export default FaqSection; 