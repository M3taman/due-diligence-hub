import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIAnalyst } from "@/components/ai/AIAnalyst";
import { Loading } from "@/components/ui/loading";
import { useAnalytics } from "@/hooks/useAnalytics";
import { FileText, BarChart2, Shield, Users, CreditCard, Activity, TrendingUp, AlertTriangle, DollarSign, Globe, Download, Calendar, Filter, PieChart, Target, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useResearchHistory } from "@/hooks/useResearchHistory";
import { formatNumber, formatDate, formatCurrency } from "@/lib/utils";

export function Dashboard() {
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
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { trackPageView } = useAnalytics();

  useState(() => {
    trackPageView('dashboard');
  }, []);

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
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DateRangePicker
          date={dateRange}
          onDateChange={setDateRange}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="ai">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Research</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <Loading /> : <p className="text-2xl">0</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <Loading /> : <p className="text-2xl">0</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? <Loading /> : <p className="text-2xl">0</p>}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? <Loading /> : <p>No data available</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai">
          <AIAnalyst dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}