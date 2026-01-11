// src/components/contacts/ContactModal.tsx
'use client';

import { X, Mail, Phone, Building, Calendar, DollarSign, Clock } from 'lucide-react';
import { adminApi } from '@/lib/api/adminClient';
import toast from 'react-hot-toast';
import { formatDate } from '@/lib/utils';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  onUpdate: () => void;
}

export default function ContactModal({ isOpen, onClose, contact, onUpdate }: ContactModalProps) {
  if (!isOpen || !contact) return null;

  const handleStatusChange = async (status: string) => {
    try {
      await adminApi.updateContactStatus(contact.id, { status });
      toast.success(`Status updated to ${status}`);
      onUpdate();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getServiceLabel = (serviceType: string) => {
    const labels: Record<string, string> = {
      custom_software: 'Custom Software Development',
      web_apps: 'Web Applications',
      mobile_apps: 'Mobile Apps',
      desktop_apps: 'Desktop Applications',
      saas: 'SaaS Product Development',
      cloud_infra: 'Cloud & Infrastructure',
      digital_transformation: 'Digital Transformation',
      consulting: 'Consulting Services',
      other: 'Other',
    };
    return labels[serviceType] || serviceType;
  };

  const getBudgetLabel = (budget: string) => {
    const labels: Record<string, string> = {
      '1k-5k': '$1,000 - $5,000',
      '5k-20k': '$5,000 - $20,000',
      '20k-50k': '$20,000 - $50,000',
      '50k+': '$50,000+',
      undecided: 'Undecided',
    };
    return labels[budget] || budget;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Contact Details</h3>
              <p className="text-sm text-gray-500 mt-1">
                Submitted {formatDate(contact.createdAt)}
              </p>
            </div>
            <button title="Close Modal"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-medium text-blue-700">
                        {contact.name?.[0]}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.email}</p>
                    </div>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{contact.company}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Project Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Budget: {getBudgetLabel(contact.budget)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Timeline: {contact.timeline}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span>Service: {getServiceLabel(contact.serviceType)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Message</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="border-t pt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Update Status</h4>
              <div className="flex flex-wrap gap-2">
                {['new', 'contacted', 'in_progress', 'converted', 'archived'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      contact.status === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4">
            <div className="flex justify-end space-x-3">
              <a
                href={`mailto:${contact.email}`}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <Mail className="h-4 w-4 mr-2" />
                Reply via Email
              </a>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}