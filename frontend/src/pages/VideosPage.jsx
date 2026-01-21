import React, { useEffect, useState } from 'react';
import { videosAPI, metadataAPI } from '../services/api';
import { Video as VideoIcon, Search, Filter, Play } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Layout from '../components/Layout';

const VideosPage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    stream: '',
    class_level: '',
    subject: '',
    difficulty: '',
    search: ''
  });
  const [subjects, setSubjects] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
    fetchSubjects();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.stream) params.stream = filters.stream;
      if (filters.class_level) params.class_level = filters.class_level;
      if (filters.subject) params.subject = filters.subject;
      if (filters.difficulty) params.difficulty = filters.difficulty;
      if (filters.search) params.search = filters.search;
      
      const response = await videosAPI.getAll(params);
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await metadataAPI.getSubjects();
      setSubjects(response.data.subjects || []);
    } catch (error) {
      console.error('Failed to fetch subjects:', error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const applyFilters = () => {
    fetchVideos();
  };

  const clearFilters = () => {
    setFilters({ stream: '', class_level: '', subject: '', difficulty: '', search: '' });
    setTimeout(fetchVideos, 100);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Video Library</h1>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search videos..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.stream} onValueChange={(v) => handleFilterChange('stream', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Stream" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All Streams</SelectItem>
                <SelectItem value="CBSE">CBSE</SelectItem>
                <SelectItem value="ICSE">ICSE</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filters.class_level} onValueChange={(v) => handleFilterChange('class_level', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All Classes</SelectItem>
                {[8, 9, 10, 11, 12].map(c => (
                  <SelectItem key={c} value={c.toString()}>Class {c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.subject} onValueChange={(v) => handleFilterChange('subject', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All Subjects</SelectItem>
                {subjects.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.difficulty} onValueChange={(v) => handleFilterChange('difficulty', v)}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button onClick={applyFilters} className="flex-1">
                <Filter size={16} className="mr-2" />
                Apply
              </Button>
              <Button onClick={clearFilters} variant="outline">Clear</Button>
            </div>
          </div>
        </Card>

        {/* Videos Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : videos.length === 0 ? (
          <Card className="p-12 text-center">
            <VideoIcon className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">No videos found. Try adjusting your filters.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {video.video_url ? (
                  <div className="relative aspect-video bg-gray-900">
                    <iframe
                      src={video.video_url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Play className="text-white" size={48} />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">by {video.teacher_name}</p>
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <span className="bg-gray-100 px-2 py-1 rounded">{video.stream}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">Class {video.class_level}</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded capitalize">{video.difficulty}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{formatDuration(video.duration)}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium mb-2">{video.subject} - {video.topic}</p>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{video.description}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default VideosPage;
