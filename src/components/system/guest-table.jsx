"use client";
import { formatDate } from '@/lib/format-date';
import Link from 'next/link';
import { useState } from 'react';

const StatusBadge = ({ status }) => {
    const statusClasses = {
        'going': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'not-going': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        'not-sure': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status] || 'bg-gray-100 text-gray-800 dark:bg-zinc-700 dark:text-zinc-200'}`}>
            {status.replace('-', ' ')}
        </span>
    );
};

export const GuestTable = ({ rsvps }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortConfig, setSortConfig] = useState({ key: 'respondedAt', direction: 'desc' });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredRsvps = rsvps.filter(rsvp => {
        const matchesSearch = 
            rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rsvp.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rsvp.guests.some(guest => guest.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesStatus = statusFilter === 'all' || rsvp.attendanceStatus === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const sortedRsvps = [...filteredRsvps].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-xl font-semibold dark:text-zinc-100">Guest List ({filteredRsvps.length})</h2>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search guests..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-zinc-100"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute left-3 top-2.5 text-gray-400 dark:text-zinc-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    
                    <select
                        className="border border-gray-300 dark:border-zinc-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-700 dark:text-zinc-100"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">All Statuses</option>
                        <option value="going">Going</option>
                        <option value="not-going">Not Going</option>
                        <option value="not-sure">Not Sure</option>
                    </select>
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                    <thead className="bg-gray-50 dark:bg-zinc-700">
                        <tr>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600"
                                onClick={() => handleSort('name')}
                            >
                                Name {getSortIndicator('name')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600"
                                onClick={() => handleSort('email')}
                            >
                                Email {getSortIndicator('email')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600"
                                onClick={() => handleSort('phone')}
                            >
                                Phone {getSortIndicator('phone')}
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600"
                                onClick={() => handleSort('attendanceStatus')}
                            >
                                Status {getSortIndicator('attendanceStatus')}
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider">
                                Guests
                            </th>
                            <th 
                                scope="col" 
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-600"
                                onClick={() => handleSort('respondedAt')}
                            >
                                Responded At {getSortIndicator('respondedAt')}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-zinc-700">
                        {sortedRsvps.length > 0 ? (
                            sortedRsvps.map((rsvp) => (
                                <tr key={rsvp._id} className="hover:bg-gray-50 dark:hover:bg-zinc-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900 dark:text-zinc-100">{rsvp.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-zinc-400">{rsvp.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-zinc-400">{rsvp.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={rsvp.attendanceStatus} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="space-y-1">
                                            {rsvp.guests.map((guest) => (
                                                <div key={guest._id} className="text-sm text-gray-500 dark:text-zinc-400">
                                                    <span className="font-medium dark:text-zinc-300">{guest.name}</span> ({guest.relationship})
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-400">
                                        {formatDate(rsvp.respondedAt)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-zinc-400">
                                    No guests found matching your criteria
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};