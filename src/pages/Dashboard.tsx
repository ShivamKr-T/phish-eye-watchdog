
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, ShieldAlert, ShieldCheck, Mail, ChartBar, ChartPie } from 'lucide-react';
import { DashboardMetric } from '@/types';

const Dashboard = () => {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    {
      id: 'phishing-detected',
      label: 'Phishing Attempts',
      value: 24,
      change: 12,
      changeType: 'increase',
      description: 'Detected in the last 30 days',
      icon: ShieldAlert
    },
    {
      id: 'safe-emails',
      label: 'Safe Emails',
      value: 1463,
      change: 8,
      changeType: 'increase',
      description: 'Verified in the last 30 days',
      icon: ShieldCheck
    },
    {
      id: 'detection-rate',
      label: 'Detection Rate',
      value: 99.2,
      change: 0.4,
      changeType: 'increase',
      description: 'Accuracy percentage',
      icon: ChartBar
    },
    {
      id: 'threat-level',
      label: 'Threat Level',
      value: 32,
      change: -5,
      changeType: 'decrease',
      description: 'Current security posture',
      icon: ChartPie
    },
  ]);

  const [securityScore, setSecurityScore] = useState(78);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setSecurityScore(85);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Security Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your organization's email security posture
        </p>
      </div>

      {/* Security Score */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Security Score</CardTitle>
          <CardDescription>Your current security posture assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="grid gap-1">
              <p className="text-3xl font-bold">{securityScore}%</p>
              <p className="text-xs text-muted-foreground">
                +7% from last assessment
              </p>
            </div>
            <div className="hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
          </div>
          <div className="mt-4">
            <Progress value={securityScore} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {metric.label}
                </CardTitle>
                {metric.icon && (
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <CardDescription>{metric.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.id === 'detection-rate' ? `${metric.value}%` : metric.value}
              </div>
              {typeof metric.change !== 'undefined' && (
                <p className={`text-xs ${getChangeColor(metric.changeType)}`}>
                  {metric.changeType === 'increase' ? '↑' : '↓'} {Math.abs(metric.change)}
                  {metric.id === 'detection-rate' ? '%' : ''}
                  {' '}since last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Email Analysis</CardTitle>
          <CardDescription>Your latest email security scans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted">
                <div className={`rounded-full p-2 ${getStatusColor(activity.status)}`}>
                  {activity.status === 'phishing' ? (
                    <ShieldAlert className="h-4 w-4" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">{activity.subject}</p>
                  <p className="text-xs text-muted-foreground">{activity.sender}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className={`text-xs font-medium ${getTextStatusColor(activity.status)}`}>
                    {activity.status === 'phishing' ? 'Phishing Detected' : 'Safe Email'}
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const recentActivities = [
  {
    sender: 'notifications@linkedin.com',
    subject: 'You have 3 new connection requests',
    time: '12 minutes ago',
    status: 'safe',
  },
  {
    sender: 'support@cloudflare.tk',
    subject: 'Your account requires verification',
    time: '47 minutes ago',
    status: 'phishing',
  },
  {
    sender: 'newsletter@company.com',
    subject: 'Weekly company newsletter - May edition',
    time: '2 hours ago',
    status: 'safe',
  },
  {
    sender: 'paypal-service@secure-paypal.info',
    subject: 'Unusual activity detected in your account',
    time: '3 hours ago',
    status: 'phishing',
  },
];

function getChangeColor(changeType?: 'increase' | 'decrease' | 'neutral') {
  if (changeType === 'increase') return 'text-green-500';
  if (changeType === 'decrease') return 'text-red-500';
  return 'text-muted-foreground';
}

function getStatusColor(status: string) {
  return status === 'phishing' 
    ? 'bg-destructive/20 text-destructive' 
    : 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400';
}

function getTextStatusColor(status: string) {
  return status === 'phishing' 
    ? 'text-destructive' 
    : 'text-green-600 dark:text-green-400';
}

export default Dashboard;
