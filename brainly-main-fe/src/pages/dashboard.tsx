import { useEffect, useState } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import { Card } from '../components/Cards';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function Dashboard() {
  const [modelOpen, setModelOpen] = useState(false);
  const [type, setType] = useState("All");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  }, []);

  let contents: any = [];
  let refresh: any;

  if (token) {
    const data = useContent();
    contents = data.contents;
    refresh = data.refresh;
  }

  useEffect(() => {
    if (refresh) {
      refresh();
    }
  }, [modelOpen]);

  const filterContent = type === "All"
    ? contents
    : contents.filter((content) => content.type === type);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Sidebar */}
      <Sidebar setType={setType} />

      {/* Modal */}
      <AnimatePresence>
        {modelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setModelOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <CreateContentModal open={modelOpen} onClose={() => setModelOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out ml-60 relative z-10">
        {/* Navbar */}
        <div className="w-full px-8 py-4 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center sticky top-0 z-30">
          <h2 className="text-xl font-semibold text-gray-800">Your Dashboard</h2>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setModelOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Button
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  { headers: { "Authorization": token } }
                );
                const shareUrl = `http://localhost:5173/api/v1/brain/${response.data.hash}`;
                copy(shareUrl);
                toast.success("Link copied to clipboard!");
              }}
              variant="secondary"
              text="Share Brain"
              startIcon={<ShareIcon />}
            />
            <Button
              variant="secondary"
              text="Log Out"
              onClick={() => {
                localStorage.clear();
                navigate("/signin");
              }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-8 z-0">
          {/* Welcome Header */}
          <div className="mb-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight animate-fade-in">
                Content Dashboard
              </h1>
              <p className="text-lg text-gray-600 font-medium animate-fade-in delay-100">
                Organize and manage your content library
              </p>
            </div>
          </div>

          {/* Content Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {filterContent.length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {type === "All" ? "Total Items" : `${type} Items`}
                    </div>
                  </div>
                  <div className="h-12 w-px bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {contents.length}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      All Content
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900 mb-1">
                    Current Filter
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {type}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          {filterContent.length > 0 ? (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Content
                </h2>
                <div className="text-sm text-gray-500">
                  {filterContent.length} items found
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 mx-8 gap-48  ">
                {filterContent.map(({ type, link, title }, index) => (
                  <motion.div
                    key={index}
                    className="transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card type={type} link={link} title={title} />
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PlusIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Content Found
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {type === "All"
                    ? "Your content library is empty. Start by adding your first piece of content to get organized!"
                    : `No ${type.toLowerCase()} content available. Try selecting a different filter or add some new content.`}
                </p>
                <Button
                  onClick={() => setModelOpen(true)}
                  variant="primary"
                  text="Create First Content"
                  startIcon={<PlusIcon />}
                />
              </div>
            </div>
          )}

          {/* Bottom Spacing */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center text-sm text-gray-500">
              <p className="font-medium">
                Powered by your creativity • Built with ❤️
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
