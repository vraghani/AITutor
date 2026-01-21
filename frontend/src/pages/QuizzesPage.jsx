import React, { useEffect, useState } from 'react';
import { quizzesAPI, metadataAPI } from '../services/api';
import { ClipboardList, Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Layout from '../components/Layout';

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    stream: '',
    class_level: '',
    subject: ''
  });
  const [subjects, setSubjects] = useState([]);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState(null);

  useEffect(() => {
    fetchQuizzes();
    fetchSubjects();
  }, []);

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filters.stream) params.stream = filters.stream;
      if (filters.class_level) params.class_level = filters.class_level;
      if (filters.subject) params.subject = filters.subject;
      
      const response = await quizzesAPI.getAll(params);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
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
    fetchQuizzes();
  };

  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setSelectedAnswers(new Array(quiz.questions.length).fill(-1));
    setQuizResult(null);
  };

  const handleAnswerSelect = (questionIndex, optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    try {
      const response = await quizzesAPI.submit(activeQuiz.id, selectedAnswers);
      setQuizResult(response.data);
    } catch (error) {
      console.error('Failed to submit quiz:', error);
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setSelectedAnswers([]);
    setQuizResult(null);
  };

  if (activeQuiz) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{activeQuiz.title}</h1>
              <div className="flex gap-2 text-sm text-gray-600">
                <span>{activeQuiz.stream}</span>
                <span>•</span>
                <span>Class {activeQuiz.class_level}</span>
                <span>•</span>
                <span>{activeQuiz.subject}</span>
                <span>•</span>
                <span className="capitalize">{activeQuiz.difficulty}</span>
              </div>
            </div>

            {quizResult ? (
              <div className="space-y-6">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 text-center">
                  <h2 className="text-3xl font-bold text-blue-600 mb-2">
                    Score: {quizResult.score.toFixed(1)}%
                  </h2>
                  <p className="text-gray-700">
                    You got {quizResult.correct} out of {quizResult.total} questions correct!
                  </p>
                </div>

                {activeQuiz.questions.map((q, qIndex) => {
                  const isCorrect = selectedAnswers[qIndex] === q.correct_answer;
                  return (
                    <div key={qIndex} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                        ) : (
                          <XCircle className="text-red-600 flex-shrink-0" size={24} />
                        )}
                        <p className="font-medium text-gray-900">{q.question}</p>
                      </div>
                      <div className="ml-9 space-y-2">
                        {q.options.map((option, oIndex) => (
                          <div
                            key={oIndex}
                            className={`p-3 rounded ${
                              oIndex === q.correct_answer
                                ? 'bg-green-50 border-2 border-green-500'
                                : oIndex === selectedAnswers[qIndex] && !isCorrect
                                ? 'bg-red-50 border-2 border-red-500'
                                : 'bg-gray-50'
                            }`}
                          >
                            <p className="text-sm">{option}</p>
                          </div>
                        ))}
                        <p className="text-sm text-gray-700 mt-3 italic">
                          <strong>Explanation:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <Button onClick={closeQuiz} className="w-full">
                  Back to Quizzes
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {activeQuiz.questions.map((q, qIndex) => (
                  <div key={qIndex} className="border rounded-lg p-6">
                    <p className="font-medium text-gray-900 mb-4">
                      {qIndex + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {q.options.map((option, oIndex) => (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedAnswers[qIndex] === oIndex
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 bg-white'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex gap-4">
                  <Button onClick={closeQuiz} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={submitQuiz}
                    disabled={selectedAnswers.includes(-1)}
                    className="flex-1"
                  >
                    Submit Quiz
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quizzes</h1>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

            <Button onClick={applyFilters}>
              <Filter size={16} className="mr-2" />
              Apply Filters
            </Button>
          </div>
        </Card>

        {/* Quizzes Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <Card className="p-12 text-center">
            <ClipboardList className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600">No quizzes found. Try adjusting your filters.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <ClipboardList className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                    <div className="flex flex-wrap gap-2 text-xs mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded">{quiz.stream}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">Class {quiz.class_level}</span>
                      <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded capitalize">
                        {quiz.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium mb-2">
                      {quiz.subject} - {quiz.topic}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {quiz.questions.length} Questions
                    </p>
                  </div>
                </div>
                <Button onClick={() => startQuiz(quiz)} className="w-full">
                  Start Quiz
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuizzesPage;
