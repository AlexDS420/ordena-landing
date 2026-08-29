-- Tabla de leads para la landing de Ordena.
-- Aplicar en D1 "ordena-leads" (id 56951654-0e94-477b-b4c1-837288b70cf3).
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'landing',
  status TEXT DEFAULT 'new',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
