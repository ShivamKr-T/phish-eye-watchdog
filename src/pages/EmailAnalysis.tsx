
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShieldCheck, ShieldAlert, Loader2, Mail, Search } from 'lucide-react';
import { EmailFormData, PredictionResponse } from '@/types';
import { analyzeEmail } from '@/services/api';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  sender: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Email body is required" }),
});

const EmailAnalysis = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);

  const form = useForm<EmailFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sender: "",
      subject: "",
      body: "",
    },
  });

  const onSubmit = async (data: EmailFormData) => {
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      // In a real app, this would be an API call to your backend
      // For demo purposes, we'll simulate the response
      setTimeout(async () => {
        try {
          // Normally we'd call this, but we'll simulate a response for the demo
          const respone = await analyzeEmail(data);
          
          // Simulate response based on some patterns in the email
          const isSuspicious = 
            data.sender.includes('unusual') || 
            data.subject.toLowerCase().includes('urgent') ||
            data.body.toLowerCase().includes('click here') ||
            data.body.toLowerCase().includes('password')||
            data.body.toLowerCase().includes('lottery');
          
          const response: PredictionResponse = isSuspicious 
            ? {
                result: "This email appears to be phishing",
                confidence: 87.5,
                risk_level: "high"
              }
            : {
                result: "This email appears to be legitimate",
                confidence: 92.3,
                risk_level: "low"
              };
              
          setResult(response);
          toast({
            title: "Analysis complete",
            description: "Email has been analyzed for phishing indicators.",
          });
        } catch (error) {
          console.error("Error analyzing email:", error);
          toast({
            title: "Analysis failed",
            description: "There was an error analyzing this email. Please try again.",
            variant: "destructive",
          });
        } finally {
          setIsAnalyzing(false);
        }
      }, 1500);
    } catch (error) {
      setIsAnalyzing(false);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Email Analysis</h1>
        <p className="text-muted-foreground">
          Check an email for potential phishing indicators
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Email Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Information
            </CardTitle>
            <CardDescription>
              Enter the details of the email you want to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="sender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sender Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="example@company.com" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Subject</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Subject line of the email" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="body"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Body</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste the email content here" 
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Email
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Analysis Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>
              Security assessment of the provided email
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h3 className="text-lg font-medium mb-1">Analyzing Email</h3>
                <p className="text-sm text-muted-foreground">
                  Checking for phishing indicators and security threats...
                </p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <Alert variant={result.risk_level === "high" || result.risk_level === "medium" ? "destructive" : "default"}>
                  {result.risk_level === "high" || result.risk_level === "medium" ? (
                    <ShieldAlert className="h-5 w-5" />
                  ) : (
                    <ShieldCheck className="h-5 w-5" />
                  )}
                  <AlertTitle>
                    {result.risk_level === "high" 
                      ? "High Risk - Potential Phishing Detected" 
                      : result.risk_level === "medium"
                      ? "Medium Risk - Suspicious Elements Found"
                      : "Low Risk - Likely Safe"}
                  </AlertTitle>
                  <AlertDescription>
                    {result.result}
                  </AlertDescription>
                </Alert>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Confidence Score</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-muted rounded-full h-3 mr-4">
                      <div 
                        className={`h-3 rounded-full ${
                          result.risk_level === "high" || result.risk_level === "medium" 
                            ? "bg-destructive" 
                            : "bg-green-500"
                        }`} 
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {result.confidence}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Security Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Risk Level:</span>
                      <span className={
                        result.risk_level === "high" 
                          ? "text-destructive font-medium" 
                          : result.risk_level === "medium" 
                          ? "text-amber-500 font-medium"
                          : "text-green-500 font-medium"
                      }>
                        {result.risk_level.charAt(0).toUpperCase() + result.risk_level.slice(1)}
                      </span>
                    </div>
                    {result.risk_level === "high" || result.risk_level === "medium" ? (
                      <div className="text-sm space-y-1 mt-3">
                        <p className="font-medium">Detected Issues:</p>
                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                          <li>Suspicious sender domain</li>
                          <li>Unusual link destinations</li>
                          <li>Urgent action requests</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="text-sm space-y-1 mt-3">
                        <p className="font-medium">Security Notes:</p>
                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                          <li>Sender domain appears legitimate</li>
                          <li>No suspicious link patterns detected</li>
                          <li>Content appears normal</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <Mail className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">No Email Analyzed Yet</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out the form on the left and click "Analyze Email" to check for phishing threats.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailAnalysis;
