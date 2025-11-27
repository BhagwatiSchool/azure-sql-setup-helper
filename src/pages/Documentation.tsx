import { useState } from "react";
import { ChevronDown, Copy, Check, Database, Server, Globe, Shield, Zap, CheckCircle2 } from "lucide-react";

const Documentation = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const CodeBlock = ({ code, language = "bash", id }: { code: string; language?: string; id: string }) => (
    <div className="relative group my-4">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => copyToClipboard(code, id)}
          className="p-2 bg-secondary hover:bg-muted rounded-md transition-colors"
        >
          {copiedCode === id ? (
            <Check className="w-4 h-4 text-success" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <pre className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );

  const CollapsibleSection = ({ 
    id, 
    title, 
    color, 
    children 
  }: { 
    id: string; 
    title: string; 
    color: string; 
    children: React.ReactNode 
  }) => (
    <div className="my-6">
      <button
        onClick={() => toggleSection(id)}
        className="w-full text-left p-4 rounded-lg transition-all duration-300 hover:shadow-lg"
        style={{ 
          background: `linear-gradient(90deg, hsl(220, 13%, 12%), hsl(220, 13%, 9%))`,
          borderLeft: `4px solid ${color}`,
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg" style={{ color }}>{title}</span>
          <ChevronDown 
            className={`w-5 h-5 transition-transform duration-300 ${expandedSections.has(id) ? 'rotate-180' : ''}`}
            style={{ color }}
          />
        </div>
      </button>
      {expandedSections.has(id) && (
        <div className="mt-4 p-6 bg-card border border-border rounded-lg animate-in slide-in-from-top-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Azure SQL Database Setup Guide</h1>
          </div>
          <p className="text-muted-foreground mt-2">Complete documentation for deploying Resource Management Dashboard</p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            This folder contains all SQL scripts required to set up the Azure SQL Database for the Resource Management Dashboard.
          </p>
        </section>

        {/* Files Table */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Zap className="w-7 h-7 text-primary" />
            Files in This Folder
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">File</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['01_create_tables.sql', 'Creates all database tables'],
                  ['02_insert_default_data.sql', 'Inserts default theme configuration'],
                  ['03_create_admin_user.sql', 'Creates default admin user'],
                  ['04_sample_resources.sql', 'Inserts sample resources (optional)'],
                  ['backup_and_restore.sql', 'Backup and restore commands'],
                ].map(([file, purpose]) => (
                  <tr key={file} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-primary">{file}</td>
                    <td className="px-6 py-4 text-muted-foreground">{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Setup Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Server className="w-7 h-7 text-success" />
            Quick Setup (Step-by-Step)
          </h2>

          {/* Step 1 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Step 1: Create Azure SQL Database</h3>
            <ol className="space-y-3 ml-6">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span className="text-muted-foreground">Login to Azure Portal: <a href="https://portal.azure.com" className="text-info hover:underline">https://portal.azure.com</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span className="text-muted-foreground">Search for <strong className="text-foreground">"SQL databases"</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span className="text-muted-foreground">Click <strong className="text-foreground">"+ Create"</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">4.</span>
                <div className="space-y-2">
                  <p className="text-muted-foreground">Fill in details:</p>
                  <ul className="ml-4 space-y-2">
                    <li className="text-muted-foreground"><strong className="text-foreground">Resource Group:</strong> Create new or select existing</li>
                    <li className="text-muted-foreground"><strong className="text-foreground">Database Name:</strong> resource-dashboard-db <span className="text-warning">(CHANGE ACCORDINGLY)</span></li>
                    <li className="text-muted-foreground"><strong className="text-foreground">Server:</strong> Create new</li>
                    <li className="ml-6 text-muted-foreground"><strong className="text-foreground">Server name:</strong> your-unique-server-name <span className="text-warning">(CHANGE ACCORDINGLY)</span></li>
                    <li className="ml-6 text-muted-foreground"><strong className="text-foreground">Location:</strong> Southeast Asia (or your preferred region)</li>
                    <li className="ml-6 text-muted-foreground"><strong className="text-foreground">Authentication:</strong> SQL authentication</li>
                    <li className="ml-6 text-muted-foreground"><strong className="text-foreground">Admin login:</strong> dbadmin <span className="text-warning">(CHANGE ACCORDINGLY)</span></li>
                    <li className="ml-6 text-muted-foreground"><strong className="text-foreground">Password:</strong> Strong password <span className="text-error">(CHANGE ACCORDINGLY and SAVE IT!)</span></li>
                  </ul>
                </div>
              </li>
            </ol>
            <div className="mt-4 p-4 bg-warning/10 border-l-4 border-warning rounded-r-lg">
              <p className="text-sm">⏱ <strong>Wait:</strong> 5-10 minutes for deployment</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-success">Step 2: Get Connection String</h3>
            <p className="text-muted-foreground mb-4">Format for PyMSSQL (Backend .env):</p>
            <CodeBlock 
              id="connection-string"
              code="mssql+pymssql://USERNAME:PASSWORD@SERVER_NAME.database.windows.net:1433/DATABASE_NAME"
            />
            <p className="text-muted-foreground mb-2">Example (CHANGE ACCORDINGLY):</p>
            <CodeBlock 
              id="connection-example"
              code="mssql+pymssql://dbadmin:MySecure@Pass123@resource-server.database.windows.net:1433/resource-dashboard-db"
            />
          </div>

          {/* Step 3 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4 text-info">Step 3: Run SQL Scripts</h3>
            <p className="text-muted-foreground mb-4">Using Azure Portal Query Editor (Easiest):</p>
            <ol className="space-y-3 ml-6 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-info font-bold">1.</span>
                <span className="text-muted-foreground">Go to your database in Azure Portal</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-info font-bold">2.</span>
                <span className="text-muted-foreground">Click <strong className="text-foreground">"Query editor"</strong> (left menu)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-info font-bold">3.</span>
                <span className="text-muted-foreground">Login with SQL authentication</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-info font-bold">4.</span>
                <span className="text-muted-foreground">Run scripts in order: 01 → 02 → 03 → 04 (optional)</span>
              </li>
            </ol>
            <div className="p-4 bg-error/10 border-l-4 border-error rounded-r-lg">
              <p className="text-sm font-semibold">⚠️ IMPORTANT: In your SQL Server Firewall, CLIENT IP AND BACKEND IP SHOULD BE ALLOWED</p>
              <p className="text-sm text-muted-foreground mt-1">(For practice purpose only)</p>
            </div>
          </div>
        </section>

        {/* Default Admin User */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-warning" />
            Default Admin User
          </h2>
          <div className="bg-card border border-border rounded-lg p-6">
            <ul className="space-y-2">
              <li className="text-muted-foreground"><strong className="text-foreground">Email:</strong> admin@example.com <span className="text-warning">(CHANGE ACCORDINGLY)</span></li>
              <li className="text-muted-foreground"><strong className="text-foreground">Password:</strong> Admin@123 <span className="text-warning">(CHANGE ACCORDINGLY)</span></li>
              <li className="text-muted-foreground"><strong className="text-foreground">Role:</strong> admin</li>
              <li className="text-muted-foreground"><strong className="text-foreground">Protected:</strong> Yes (cannot be deleted)</li>
            </ul>
            <div className="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error font-semibold">⚠️ IMPORTANT: Change these credentials in production!</p>
            </div>
          </div>
        </section>

        {/* Collapsible Sections */}
        <CollapsibleSection id="architecture" title="💡 Architecture Benefits" color="#22c55e">
          <h3 className="text-xl font-semibold mb-4">✅ All About Our Complete Project</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-1" />
              <div>
                <strong className="text-foreground">Frontend</strong>
                <p className="text-muted-foreground">React + Vite (Static build ready)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-1" />
              <div>
                <strong className="text-foreground">Backend</strong>
                <p className="text-muted-foreground">Python FastAPI with JWT authentication</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-success mt-1" />
              <div>
                <strong className="text-foreground">Database</strong>
                <p className="text-muted-foreground">Azure SQL Database</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="features" title="🔧 What's Included" color="#8b5cf6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">Backend</h4>
              <ul className="space-y-2">
                {[
                  'Python FastAPI framework',
                  'Azure SQL Database',
                  'JWT Authentication',
                  'SQLAlchemy ORM',
                  'Pydantic validation'
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">Frontend</h4>
              <ul className="space-y-2">
                {[
                  'Auth Context for Python backend',
                  'API Client for FastAPI',
                  'Configuration for backend URL',
                  'React 18 + TypeScript',
                  'Shadcn UI components'
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="deployment" title="🚀 Main Important Steps" color="#ff0080">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">1. Setup Azure SQL Database</h4>
              <CodeBlock 
                id="azure-setup"
                code={`# Azure Portal mein:
1. Create SQL Database
2. Note: server name, database name, username, password
3. Run: backend/azure_sql_schema.sql
4. Configure firewall rules for VM IPs`}
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-success">2. Deploy Backend (VM 2)</h4>
              <CodeBlock 
                id="backend-deploy"
                code={`cd backend
pip install -r requirements.txt

# Configure .env file
python run.py
# Production: uvicorn app.main:app --host 0.0.0.0 --port 8000`}
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-info">3. Deploy Frontend (VM 1)</h4>
              <CodeBlock 
                id="frontend-deploy"
                code={`cd client
npm install
npm run build
sudo cp -r dist/public/* /var/www/html/`}
              />
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="security" title="🔐 Security Notes" color="#ddff00">
          <div className="space-y-4">
            <div className="p-4 bg-secondary rounded-lg">
              <h4 className="font-semibold mb-2">Production Checklist:</h4>
              <ul className="space-y-2 ml-4">
                {[
                  'Change SECRET_KEY to random secure value',
                  'Enable HTTPS with SSL certificates',
                  'Configure Azure SQL firewall rules',
                  'Set up Azure Key Vault for secrets',
                  'Enable CORS only for your frontend domain',
                  'Use strong passwords for database'
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-warning">□</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="testing" title="🧪 Testing" color="#ff0000">
          <h4 className="font-semibold text-lg mb-3">Test Backend API</h4>
          <CodeBlock 
            id="test-api"
            code={`# Health check
curl http://localhost:8000/health

# Get theme config (public)
curl http://localhost:8000/api/theme

# Signup
curl -X POST http://localhost:8000/api/auth/signup \\
  -H "Content-Type: application/json" \\
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \\
  -d "email=test@example.com&password=password123"`}
          />
        </CollapsibleSection>

        <CollapsibleSection id="endpoints" title="🎯 Key Endpoints" color="#51f289">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-primary">Backend API (Port 8000)</h4>
              <ul className="space-y-2 ml-4">
                {[
                  'POST /api/auth/signup - Register new user',
                  'POST /api/auth/login - Login user (returns JWT)',
                  'GET /api/users/me - Get current user (requires auth)',
                  'PATCH /api/users/me - Update profile (requires auth)',
                  'GET /api/users/ - Get all users (admin only)',
                  'GET /api/theme/ - Get theme config (public)',
                  'PATCH /api/theme/{key} - Update theme (admin only)'
                ].map(endpoint => (
                  <li key={endpoint} className="font-mono text-sm text-muted-foreground">{endpoint}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-success">Frontend (Port 80/443)</h4>
              <ul className="space-y-2 ml-4">
                {[
                  '/auth - Login/Signup page',
                  '/ - Dashboard (protected)',
                  '/profile - User profile (protected)',
                  '/settings - Settings (protected)',
                  '/theme-settings - Theme config (admin only)',
                  '/user-management - User management (admin only)'
                ].map(route => (
                  <li key={route} className="font-mono text-sm text-muted-foreground">{route}</li>
                ))}
              </ul>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="summary" title="🎉 Summary" color="#006312">
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground">
              Our Project is now <strong className="text-success">production-ready 3-tier architecture</strong>:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                <div>
                  <strong className="text-foreground">Frontend:</strong>
                  <p className="text-muted-foreground">Static React build (nginx se serve hoga)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                <div>
                  <strong className="text-foreground">Backend:</strong>
                  <p className="text-muted-foreground">Python FastAPI (systemd service se chalega)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-success mt-1" />
                <div>
                  <strong className="text-foreground">Database:</strong>
                  <p className="text-muted-foreground">Azure SQL (managed service)</p>
                </div>
              </div>
            </div>
            <p className="text-lg text-success font-semibold mt-6">Happy Deploying! 🚀</p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="checklist" title="✅ Final Checklist" color="#826c62">
          <ul className="space-y-2">
            {[
              'Azure SQL Database created',
              'Connection string copied',
              'All SQL scripts executed successfully',
              'Tables verified in Query Editor',
              'Default admin user created',
              'Backend .env updated with DATABASE_URL',
              'Firewall rules configured',
              'Test connection from backend'
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-muted">□</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Globe className="w-5 h-5" />
            <p>Azure SQL Database Setup Guide - Resource Management Dashboard</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;
