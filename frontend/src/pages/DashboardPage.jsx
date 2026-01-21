import React, { useEffect, useState } from 'react';
import { dashboardAPI } from '../services/api';
import { BookOpen, Video, Trophy, Clock, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/card';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  const statCards = [
    {
      icon: BookOpen,
      label: 'Topics Studied',
      value: stats?.total_topics_studied || 0,
      color: 'blue'
    },
    {
      icon: Trophy,
      label: 'Quizzes Completed',
      value: stats?.total_quizzes_completed || 0,
      color: 'green'
    },
    {
      icon: TrendingUp,
      label: 'Average Score',
      value: `${stats?.average_quiz_score || 0}%`,
      color: 'purple'
    },
    {
      icon: Clock,
      label: 'Time Spent',
      value: `${stats?.total_time_spent || 0}m`,
      color: 'orange'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                    <Icon className={`text-${stat.color}-600`} size={24} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Subject-wise Progress */}
        {stats?.subject_stats && Object.keys(stats.subject_stats).length > 0 && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Subject-wise Progress</h2>
            <div className="space-y-4">
              {Object.entries(stats.subject_stats).map(([subject, data]) => (
                <div key={subject} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{subject}</h3>
                    <span className="text-sm text-gray-600">
                      {data.topics_studied} topics
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{data.time_spent} minutes</span>
                    <span>•</span>
                    <span>{Math.round(data.average_mastery)}% mastery</span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(data.average_mastery, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {stats?.total_topics_studied === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="mx-auto mb-4 text-gray-400" size={48} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Your Learning Journey
            </h3>
            <p className="text-gray-600 mb-6">
              Explore books, watch videos, and take quizzes to track your progress
            </p>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;
