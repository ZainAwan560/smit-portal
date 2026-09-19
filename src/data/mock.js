export const course = {
  title: "Modern Web Application Development",
  batch: "20",
  roll: "776510",
  campus: "Zaitoon Ashraf IT Park",
  city: "Karachi",
  schedule: [
    "Mon 01:00 PM - 03:00 PM",
    "Wed 01:00 PM - 03:00 PM",
    "Fri 01:00 PM - 03:00 PM",
  ],
};
export const student = {
  name: "Zain Awan",
  fullName: "S Muzammil Javed - Zaitoon Ashraf IT Park",
  attendance: { total: 113, present: 106, leave: 0, absent: 7 },
  progress: { total: 81, completed: 57, pending: 24 },
  topics: [
    ["Web Designing", 20, 20, 100],
    ["Front-End Development", 27, 31, 87],
    ["Modern Front-End Development", 10, 14, 71],
    ["Back-End Development", 0, 16, 0],
  ],
};
export const assignments = [
  ["Admin panel (E commerce Dashboard)", 7, "September 10, 2026", "APPROVED"],
  ["QUICKSERVE WMA (Batch-20)", "—", "August 30, 2026", "NOT SUBMITTED"],
  ["E-Commerce Website (React js)", 4, "August 17, 2026", "APPROVED"],
  ["Furniture E-Commerce Website", 5, "August 10, 2026", "SUBMITTED"],
  ["MaintainIQ (Batch-20)", "—", "July 12, 2026", "SUBMITTED"],
  ["Javascript Assignment", "8", "July 10, 2026", "SUBMITTED"],
  ["Budgeting App", "10", "June 1, 2026", "APPROVED"],
  ["Amazon Clone", "13", "May 24, 2026", "APPROVED"],
  ["NASA Landing Page", "7", "May 1, 2026", "APPROVED"],
];
export const quizzes = [
  [
    "Javascript (Quiz-4)",
    "Modern Front-End Development",
    40,
    "1 / 3",
    "85%",
    "PASSED",
  ],
  [
    "Javascript (Quiz-3)",
    "Modern Front-End Development",
    40,
    "1 / 3",
    "90%",
    "PASSED",
  ],
  [
    "Javascript (Quiz-2)",
    "Modern Front-End Development",
    40,
    "1 / 3",
    "90%",
    "PASSED",
  ],
  [
    "Javascript (Quiz-1)",
    "Modern Front-End Development",
    40,
    "1 / 3",
    "98%",
    "PASSED",
  ],
  ["CSS Quiz", "Front-End Development", 40, "1 / 3", "43%", "FAILED"],
  ["HTML Quiz", "Web Designing", 40, "1 / 3", "85%", "PASSED"],
];
export const students = Array.from({ length: 57 }, (_, i) => ({
  roll: String(776500 + i),
  name: [
    "Adeel Ahmed",
    "Muhammad Hamza",
    "Abdul Wahid",
    "Ali Raza",
    "Areeba Khan",
    "Hassan Ali",
    "Maham Noor",
  ][i % 7],
  email: `student${i + 1}@example.com`,
  status: "ENROLLED",
  batch: `${18 + (i % 4)}`,
}));
export const teachers = Array.from({ length: 18 }, (_, i) => ({
  id: `T-${100 + i}`,
  name: [
    "Muhammad Asad",
    "Ahmed Raza",
    "Sana Khan",
    "Bilal Ahmed",
    "Ayesha Noor",
  ][i % 5],
  email: `teacher${i + 1}@smit.com`,
  course: [
    "Modern Web Application Development",
    "Web & Mobile App Development",
    "Backend Development",
  ][i % 3],
  status: "ACTIVE",
}));
export const courses = [
  [
    "Modern Web Application Development",
    "Batch 20",
    "113 students",
    "81 topics",
  ],
  ["Web & Mobile App Development", "Batch 18", "98 students", "76 topics"],
  ["Backend Development", "Batch 12", "75 students", "64 topics"],
  ["Web Designing", "Batch 24", "120 students", "20 topics"],
];
export const attendanceDates = [
  "Wed, Sep 2, 2026",
  "Fri, Sep 4, 2026",
  "Mon, Sep 7, 2026",
  "Wed, Sep 9, 2026",
  "Fri, Sep 11, 2026",
  "Mon, Sep 14, 2026",
  "Wed, Sep 16, 2026",
];
export const payments = [
  ["Sep 2026", "Rs: 1000 /-", "Monthly", "08-Sep-2026", "202609776510", "PAID"],
  ["Aug 2026", "Rs: 1000 /-", "Monthly", "08-Aug-2026", "202608776510", "PAID"],
  ["Jul 2026", "Rs: 1000 /-", "Monthly", "08-Jul-2026", "202607776510", "PAID"],
  ["Jun 2026", "Rs: 1000 /-", "Monthly", "08-Jun-2026", "202606776510", "PAID"],
  ["May 2026", "Rs: 1000 /-", "Monthly", "08-May-2026", "202605776510", "PAID"],
  ["Apr 2026", "Rs: 1000 /-", "Monthly", "08-Apr-2026", "202604776510", "PAID"],
  ["Mar 2026", "Rs: 1000 /-", "Monthly", "08-Mar-2026", "202603776510", "PAID"],
  ["Feb 2026", "Rs: 1000 /-", "Monthly", "12-Feb-2026", "202602776510", "PAID"],
  ["Jan 2026", "Rs: 1000 /-", "Monthly", "11-Jan-2026", "202601776510", "PAID"],
  ["Dec 2025", "Rs: 1000 /-", "Monthly", "08-Dec-2025", "202512776510", "PAID"],
  [
    "Nov 2025",
    "Rs: 1000 /-",
    "Monthly",
    "19-Nov-2025",
    "202511776510",
    "PENDING",
  ],
];
export const adminStats = {
  students: 201,
  teachers: 18,
  courses: 12,
  batches: 21,
  attendance: "94%",
  assignments: 16,
  submitted: 14,
  pending: 2,
};
export const adminActivities = [
  ["New student enrolled", "Areeba Khan joined Batch 20", "2 min ago"],
  ["Assignment submitted", "Furniture E-Commerce Website", "18 min ago"],
  ["Payment received", "Voucher 202609776510", "42 min ago"],
  ["Teacher updated", "Muhammad Asad profile updated", "1 hr ago"],
];
export const adminAttendance = [
  [
    "776510",
    "Zain Awan",
    "Modern Web Application Development",
    "94%",
    "ACTIVE",
  ],
  [
    "776511",
    "Adeel Ahmed",
    "Modern Web Application Development",
    "91%",
    "ACTIVE",
  ],
  ["776512", "Muhammad Hamza", "Web & Mobile App Development", "88%", "ACTIVE"],
  ["776513", "Abdul Wahid", "Backend Development", "96%", "ACTIVE"],
  ["776514", "Ali Raza", "Web Designing", "84%", "ACTIVE"],
];
