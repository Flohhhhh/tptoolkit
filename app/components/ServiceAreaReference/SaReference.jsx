import React from "react";

const SaReference = () => {
  const data = [
    {
      title: "Parkway Service Areas",
      headings: ["Name", "Old Name", "MP", "Station"],
      rows: [
        ["Toni Morrison", "Ocean View", "18.3", "E030"],
        ["Frank Sinatra", "Atlantic City", "41.4", "E030"],
        ["Celia Cruz", "Forked River", "76.0", "E030"],
        ["Judy Blume", "Monmouth", "100.0", "E050"],
        ["Jon Bon Jovi", "Cheesequake", "124.0", "E050"],
        ["Colonia South", "", "132.5", "E040"],
        ["Colonia North", "", "132.8", "E040"],
        ["Whitney Houston", "Vauxhaull (SB)", "142.2", "E040"],
        ["Larry Dobby", "Brookdale (NB)", "153.0", "E040"],
        ["Connie Chung", "Brookdale (SB)", "153.0", "E040"],
        ["James Gandolfini", "Montvale", "171.0", "E040"],
      ],
    },
    {
      title: "Turnpike Service Areas",
      headings: ["Name", "ID", "MP", "Station"],
      rows: [
        ["Clara Barton", "1S", "5.4", "D020"],
        ["John Fenwick", "1N", "5.4", "D020"],
        ["Walt Whitman", "3S", "30.2", "D020"],
        ["James Fenmore", "4N", "39.4", "D020"],
        ["John Stockton", "6S", "58.7", "D020"],
        ["Woodrow Wilson", "6N", "58.7", "D020"],
        ["Molly Pitcher", "7S", "71.7", "D020"],
        ["Park & Ride", "8A", "73.7", "D010"],
        ["Joyce Kilmer", "8N", "78.7", "D010"],
        ["Thomas Edison", "10S", "92.9", "D010"],
        ["Grover Clevland", "10N", "92.9", "D010"],
        ["Alexander Hamilton", "12S", "111.6", "D030"],
        ["Vince Lombardi", "13", "116.0", "D030"],
      ],
    },
  ];

  const tables = data.map((table, index) => {
    return (
      <div className='p-4' key={index}>
        <h2 className='mb-4 text-2xl font-bold text-shark-700  dark:text-shark-300'>
          {table.title}
        </h2>
        <div
          key={index}
          className='relative overflow-x-auto rounded-lg border border-shark-200 dark:border-shark-600 mb-4'
        >
          <table className='table-auto w-full text-left shadow-lg'>
            <thead className='text-shark-900 dark:text-shark-200 h-12'>
              <tr>
                {table.headings.map((heading, index) => {
                  return (
                    <th className='px-4 py-2' key={index}>
                      {heading}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => {
                return (
                  <tr
                    key={index}
                    className='text-shark-700 dark:text-shark-200 odd:bg-shark-50 dark:odd:bg-shark-700/80 border-b border-shark-200 dark:border-shark-600'
                  >
                    {row.map((cell, index) => {
                      return (
                        <td className='px-4 py-2' key={index}>
                          {cell}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  });

  return (
    <div className='z-10 absolute top-12 right-0 bottom-0 overflow-y-scroll p-2'>
      <div className=' bg-white dark:bg-shark-800 rounded-lg border border-shark-200 dark:border-shark-600'>
        {tables}
      </div>
    </div>
  );
};

export default SaReference;