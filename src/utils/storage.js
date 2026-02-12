/*  
  STORAGE KEYS  
*/
const REPORTS_KEY = "lf_reports_v1";
const VIEWS_KEY = "lf_views_v1";
const BOOKMARKS_KEY = "lf_bookmarks_v1";

/*  
  ------------------------------
  BASIC REPORT FUNCTIONS
  ------------------------------
*/

// Get ALL reports
export function getReports() {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("getReports parse error", e);
    return [];
  }
}

// Save ALL reports
export function saveReports(reports) {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

// Add a new report (lost or found)
export function addReport(report) {
  const reports = getReports();
  reports.unshift(report); // newest at top
  saveReports(reports);
}

// Update specific report by ID
export function updateReport(id, updatedFields) {
  const updated = getReports().map((r) =>
    r.id === id ? { ...r, ...updatedFields } : r
  );
  saveReports(updated);
}

/*  
  REQUIRED for Admin Panel
*/
export function updateReportStatus(id, status) {
  const updated = getReports().map((r) =>
    r.id === id ? { ...r, status } : r
  );
  saveReports(updated);
}

/*  
  ------------------------------
  DELETE
  ------------------------------
*/
export function deleteReport(id) {
  const filtered = getReports().filter((r) => r.id !== id);
  saveReports(filtered);
}

/*  
  ------------------------------
  FILTERED GETTERS
  ------------------------------
*/
export function getLostReports() {
  return getReports().filter((r) => r.type === "lost");
}

export function getFoundReports() {
  return getReports().filter((r) => r.type === "found");
}

/*  
  ------------------------------
  VIEW COUNTER (optional)
  ------------------------------
*/
export function incrementViewCount(itemId) {
  const raw = localStorage.getItem(VIEWS_KEY);
  const counts = raw ? JSON.parse(raw) : {};
  counts[itemId] = (counts[itemId] || 0) + 1;
  localStorage.setItem(VIEWS_KEY, JSON.stringify(counts));
  return counts[itemId];
}

export function getViewCount(itemId) {
  const raw = localStorage.getItem(VIEWS_KEY);
  const counts = raw ? JSON.parse(raw) : {};
  return counts[itemId] || 0;
}

