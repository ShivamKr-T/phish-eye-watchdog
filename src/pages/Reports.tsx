
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, ChartBar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  // In a real app, this data would come from an API
  const summaryData = {
    totalScanned: 1578,
    phishingDetected: 24,
    safeEmails: 1554,
    detectionRate: 98.7,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Security Reports</h1>
        <p className="text-muted-foreground">
          Email security metrics and phishing analysis reports
        </p>
      </div>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="recent">Recent Threats</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ReportCard 
              title="Total Emails Scanned" 
              value={summaryData.totalScanned.toLocaleString()} 
              description="Past 30 days" 
              icon={FileText}
            />
            <ReportCard 
              title="Phishing Detected" 
              value={summaryData.phishingDetected.toLocaleString()} 
              description="Past 30 days" 
              icon={Shield}
              highlight="negative"
            />
            <ReportCard 
              title="Safe Emails" 
              value={summaryData.safeEmails.toLocaleString()} 
              description="Past 30 days" 
              icon={Shield}
              highlight="positive"
            />
            <ReportCard 
              title="Detection Rate" 
              value={`${summaryData.detectionRate}%`} 
              description="Accuracy percentage" 
              icon={ChartBar}
            />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Phishing Domains</CardTitle>
              <CardDescription>Domains most frequently flagged as malicious</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPhishingDomains.map((domain, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-[35%] flex items-center gap-2">
                      <div className="font-medium">{domain.domain}</div>
                    </div>
                    <div className="w-[45%]">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div
                          className="bg-destructive h-2.5 rounded-full"
                          style={{ width: `${domain.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-[20%] text-right">{domain.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Monthly Report Summary</CardTitle>
              <CardDescription>April 2025 Security Overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Key Findings</h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>12% increase in targeted phishing campaigns</li>
                  <li>Most attacks occurred between 9-11am on weekdays</li>
                  <li>Finance department received the highest number of attacks</li>
                  <li>Improved detection rate by 2.3% from previous month</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recommendations</h4>
                <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                  <li>Schedule additional security training for finance team</li>
                  <li>Enable enhanced scanning for PDF attachments</li>
                  <li>Update security policies for remote workers</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recent Phishing Attempts</CardTitle>
              <CardDescription>Detected in the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentPhishingAttempts.map((attempt, i) => (
                  <div key={i} className="pb-6 border-b last:border-0">
                    <div className="flex flex-wrap items-center justify-between mb-2">
                      <h4 className="font-medium text-destructive">
                        {attempt.subject}
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {attempt.date}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Sender: {attempt.sender}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                      <div>
                        <h5 className="text-sm font-medium mb-1">Detection Details</h5>
                        <ul className="list-disc pl-5 text-muted-foreground text-xs space-y-1">
                          {attempt.detectionDetails.map((detail, j) => (
                            <li key={j}>{detail}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium mb-1">Risk Assessment</h5>
                        <div className="text-xs text-muted-foreground space-y-2">
                          <div className="flex justify-between">
                            <span>Risk Level:</span>
                            <span className={`font-medium ${
                              attempt.riskLevel === 'High' 
                                ? 'text-destructive' 
                                : attempt.riskLevel === 'Medium'
                                ? 'text-amber-500'
                                : 'text-green-500'
                            }`}>
                              {attempt.riskLevel}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confidence:</span>
                            <span>{attempt.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Phishing Trends</CardTitle>
              <CardDescription>Analysis of attack patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h4 className="font-medium">Current Tactics</h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Impersonation of internal IT services</li>
                    <li>File sharing links disguised as company documents</li>
                    <li>Fake password reset notifications</li>
                    <li>Urgent request tactics from executive impersonation</li>
                    <li>Fake invoice payment notifications</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Target Distribution</h4>
                  <div className="space-y-4">
                    {departmentTargets.map((dept, i) => (
                      <div key={i} className="flex items-center">
                        <div className="w-[35%]">
                          <div className="font-medium">{dept.department}</div>
                        </div>
                        <div className="w-[45%]">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className={`h-2.5 rounded-full ${
                                dept.percentage > 20 
                                  ? 'bg-destructive' 
                                  : dept.percentage > 10
                                  ? 'bg-amber-500'
                                  : 'bg-primary'
                              }`}
                              style={{ width: `${dept.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-[20%] text-right">{dept.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Emerging Threats</h4>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>AI-generated phishing emails with fewer grammatical errors</li>
                    <li>Multi-stage attacks that build credibility before requesting action</li>
                    <li>Increased attacks related to current events and holidays</li>
                    <li>SMS phishing attempts linked to corporate email addresses</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ReportCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  highlight?: 'positive' | 'negative';
}

const ReportCard = ({
  title,
  value,
  description,
  icon: Icon,
  highlight
}: ReportCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${
          highlight === 'positive' 
            ? 'text-green-500' 
            : highlight === 'negative' 
            ? 'text-destructive'
            : ''
        }`}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
};

const topPhishingDomains = [
  { domain: 'secure-login-portal.com', percentage: 32 },
  { domain: 'microsoft-verification.net', percentage: 24 },
  { domain: 'document-share.info', percentage: 19 },
  { domain: 'paypal-secure-login.com', percentage: 15 },
  { domain: 'account-verify-now.com', percentage: 10 },
];

const departmentTargets = [
  { department: 'Finance', percentage: 35 },
  { department: 'Executive', percentage: 25 },
  { department: 'HR', percentage: 18 },
  { department: 'IT', percentage: 12 },
  { department: 'Marketing', percentage: 10 },
];

const recentPhishingAttempts = [
  {
    subject: 'Urgent: Update your VPN access credentials',
    sender: 'it-support@company-network.info',
    date: 'April 21, 2025',
    riskLevel: 'High',
    confidence: 96,
    detectionDetails: [
      'Spoofed internal domain',
      'Suspicious URL in email body',
      'Urgent language and timeframe',
      'Requesting credentials outside normal process'
    ]
  },
  {
    subject: 'Invoice #37429 Payment Overdue',
    sender: 'accounting@invoiceprocessing-center.com',
    date: 'April 19, 2025',
    riskLevel: 'Medium',
    confidence: 84,
    detectionDetails: [
      'Unknown sender domain',
      'Suspicious attachment',
      'Unusual payment instructions',
      'Mismatched sender information'
    ]
  },
  {
    subject: 'Please review and sign this document',
    sender: 'docusign@secure-docs-signing.net',
    date: 'April 16, 2025',
    riskLevel: 'High',
    confidence: 92,
    detectionDetails: [
      'Fake DocuSign domain',
      'Suspicious document link',
      'Request for credentials',
      'Hidden redirect URL'
    ]
  },
];

export default Reports;
