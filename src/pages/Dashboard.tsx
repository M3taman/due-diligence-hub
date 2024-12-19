import { AIAnalyst } from "@/components/ai/AIAnalyst";
import { Card } from "@/components/ui/card";
import { 
  FileText, BarChart2, Shield, Users, CreditCard, Activity,
  TrendingUp, AlertTriangle, DollarSign, Globe, Download,
  Calendar, Filter, PieChart, Target, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, BarChart, PieChartComponent } from "@/components/ui/charts";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { formatNumber, formatDate, formatCurrency } from "@/lib/utils";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalAnalyses: 0,
    riskScore: 0,
    marketSentiment: 0,
    complianceScore: 0,
    recentAlerts: [],
    keyMetrics: {
      financialHealth: 0,
      marketPosition: 0,
      operationalEfficiency: 0,
      regulatoryCompliance: 0
    }
  });
  
  const { researchHistory } = useResearchHistory();

  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [chartData, setChartData] = useState(null);

  const fetchChartData = async () => {
    try {
      const { data } = await supabase
        .from('analysis_metrics')
        .select('*')
        .gte('timestamp', dateRange.from)
        .lte('timestamp', dateRange.to);
      setChartData(data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load chart data"
      });
    }
  };

  const exportDashboard = async () => {
    try {
      const exportData = {
        metrics: dashboardData,
        charts: chartData,
        dateRange,
        timestamp: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-export-${formatDate(new Date())}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Dashboard data has been exported successfully"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "Failed to export dashboard data"
      });
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await supabase
          .from('dashboard_metrics')
          .select('*')
          .single();
        
        setDashboardData(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load dashboard data"
        });
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000); // 5-minute refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Due Diligence Dashboard</h1>
          <p className="text-muted-foreground">Real-time market and company analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Risk Score</p>
              <h3 className="text-2xl font-bold">{dashboardData.riskScore}%</h3>
            </div>
            <AlertTriangle className={`w-8 h-8 ${
              dashboardData.riskScore > 70 ? 'text-destructive' : 'text-primary'
            }`} />
          </div>
          <Progress value={dashboardData.riskScore} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Market Sentiment</p>
              <h3 className="text-2xl font-bold">{dashboardData.marketSentiment}%</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-primary" />
          </div>
          <Progress value={dashboardData.marketSentiment} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <h3 className="text-2xl font-bold">{dashboardData.complianceScore}%</h3>
            </div>
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <Progress value={dashboardData.complianceScore} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-muted-foreground">Total Analyses</p>
              <h3 className="text-2xl font-bold">{formatNumber(dashboardData.totalAnalyses)}</h3>
            </div>
            <BarChart2 className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      <div className="flex gap-4 items-center">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          className="w-[300px]"
        />
        <Select
          value={selectedMetric}
          onValueChange={setSelectedMetric}
          options={[
            { value: 'all', label: 'All Metrics' },
            { value: 'financial', label: 'Financial' },
            { value: 'market', label: 'Market' },
            { value: 'compliance', label: 'Compliance' }
          ]}
        />
        <Button variant="outline" onClick={fetchChartData}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Update
        </Button>
        <Button variant="outline" onClick={exportDashboard}>
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
              <LineChart data={chartData?.trendData} />
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
              <PieChartComponent data={chartData?.riskData} />
            </Card>
          </div>
        </TabsContent>

        {/* Add similar content for other tabs */}
      </Tabs>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Analysis Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">AI-Powered Analysis</h2>
            <AIAnalyst />
          </Card>
        </div>

        {/* Recent Activity & Alerts */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Alerts</h2>
            <div className="space-y-4">
              {dashboardData.recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-4">
                  <AlertTriangle className={`w-4 h-4 mt-1 ${
                    alert.severity === 'high' ? 'text-destructive' : 'text-warning'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(alert.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Research</h2>
            <div className="space-y-4">
              {researchHistory?.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-start gap-4">
                  <FileText className="w-4 h-4 mt-1" />
                  <div>
                    <p className="text-sm font-medium">{entry.query}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(entry.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;