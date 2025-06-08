"use client";
import React, { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Templates } from '@/enums/template';

export default function Page() {
    const { userId } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        eventType: 'meetup',
        host: '',
        description: '',
        date: '',
        endDate: '',
        location: {
            venue: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            },
            coordinates: [0, 0],
            onlineEvent: false,
            meetingLink: ''
        },
        customSlug: '',
        privacy: 'invite-only',
        templateId: 'classic',
        galleryEnabled: true,
        guestbookEnabled: true,
        qrcodeEnabled: true,
        rsvpDeadline: '',
        tags: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Handle location.address fields
        if (name.startsWith('location.address.')) {
            const field = name.split('location.address.')[1];
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    address: {
                        ...prev.location.address,
                        [field]: type === 'checkbox' ? checked : value
                    }
                }
            }));
        }
        // Handle direct location fields
        else if (name.startsWith('location.')) {
            const field = name.split('location.')[1];
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [field]: type === 'checkbox' ? checked : value
                }
            }));
        }
        // Handle tags separately
        else if (name === 'tags') {
            const tagsArray = value.split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);
            setFormData(prev => ({ ...prev, tags: tagsArray }));
        }
        // Handle top-level fields
        else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const generateInvitationMessage = async () => {
        const requiredFields = [
            { field: formData.title, name: "Event Title" },
            { field: formData.host, name: "Host Name" },
            { field: formData.date, name: "Start Date" },
        ];

        const missingFields = requiredFields.filter(item => !item.field);

        if (missingFields.length > 0) {
            setAlertMessage(
                `Please fill in these required fields first: ${missingFields.map(f => f.name).join(', ')}. 
      This helps us generate a more personalized invitation message for you.`
            );
            setShowAlert(true);
            return;
        }
        setIsGenerating(true);
        try {
            const response = await fetch('/api/events/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventData: formData
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate invitation');
            }

            const { message } = await response.json();
            setFormData(prev => ({
                ...prev,
                description: message
            }));
        } catch (err) {
            console.error('Generation error:', err);
            setError('Failed to generate invitation message');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId) {
            setError('Please sign in to create an event');
            return;
        }
        setError('');
        isSubmitting(true);

        try {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create event');
            }

            const event = await response.json();
            router.push(`/dashboard/invitations/${event.customSlug || event._id}`);
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-zinc-50 dark:bg-zinc-900 p-4">
            <div className="w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">Create Your Event</h1>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-[2fr_1fr] gap-6">
                    {/* Main Form */}
                    <div className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Event Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Event title*"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            />
                        </div>

                        {/* Event Type */}
                        <div>
                            <label htmlFor="eventType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Event Type *
                            </label>
                            <select
                                id="eventType"
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            >
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                                <option value="meetup">Meetup</option>
                                <option value="webinar">Webinar</option>
                                <option value="social">Social</option>
                                <option value="concert">Concert</option>
                                <option value="exhibition">Exhibition</option>
                                <option value="networking">Networking</option>
                                <option value="hackathon">Hackathon</option>
                                <option value="wedding">Wedding</option>
                                <option value="birthday">Birthday</option>
                                <option value="corporate">Corporate</option>
                            </select>
                        </div>

                        {/* Host Name */}
                        <div>
                            <label htmlFor="hostName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Host Name *
                            </label>
                            <input
                                id="hostName"
                                type="text"
                                name="host"
                                value={formData.host}
                                onChange={handleChange}
                                required
                                placeholder="Name to display as host*"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            />
                        </div>

                        {/* Description */}
                        <div className='relative'>
                            <label htmlFor="description" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Description (optional)
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Describe your event..."
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            />
                            <button
                                type="button"
                                onClick={generateInvitationMessage}
                                disabled={isGenerating}
                                className="px-4 py-2 bg-blue-100 dark:bg-blue-50/10 dark:text-blue-50 cursor-pointer text-blue-700 rounded-full hover:bg-blue-200 transition-colors absolute bottom-4 right-2"
                                title="Fill in event details first for best results"
                            >
                                {isGenerating ? 'Generating...' : 'Generate beautiful message'}
                            </button>
                        </div>

                        {/* Date Range */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    Start Date *
                                </label>
                                <input
                                    id="date"
                                    type="datetime-local"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                    End Date
                                </label>
                                <input
                                    id="endDate"
                                    type="datetime-local"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="venue" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Venue Name
                                    </label>
                                    <input
                                        id="venue"
                                        type="text"
                                        name="location.venue"
                                        value={formData.location.venue}
                                        onChange={handleChange}
                                        placeholder="Venue name"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="location.address.city"
                                        value={formData.location.address.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="state" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        State/Region
                                    </label>
                                    <input
                                        id="state"
                                        type="text"
                                        name="location.address.state"
                                        value={formData.location.address.state}
                                        onChange={handleChange}
                                        placeholder="State/Region"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="zipCode" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        ZIP Code
                                    </label>
                                    <input
                                        id="zipCode"
                                        type="text"
                                        name="location.address.zipCode"
                                        value={formData.location.address.zipCode}
                                        onChange={handleChange}
                                        placeholder="ZIP/Postal code"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="country" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Country
                                    </label>
                                    <input
                                        id="country"
                                        type="text"
                                        name="location.address.country"
                                        value={formData.location.address.country}
                                        onChange={handleChange}
                                        placeholder="Country"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-3 p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                    <input
                                        type="checkbox"
                                        name="location.onlineEvent"
                                        checked={formData.location.onlineEvent}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-zinc-600 dark:text-zinc-500 focus:ring-zinc-500 border-zinc-300 dark:border-zinc-600 rounded"
                                    />
                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">This is an online event</span>
                                </label>
                            </div>

                            {formData.location.onlineEvent && (
                                <div>
                                    <label htmlFor="meetingLink" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                        Meeting Link *
                                    </label>
                                    <input
                                        id="meetingLink"
                                        type="url"
                                        name="location.meetingLink"
                                        value={formData.location.meetingLink}
                                        onChange={handleChange}
                                        required={formData.location.onlineEvent}
                                        placeholder="https://zoom.us/j/1234567890"
                                        className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Custom URL */}
                        <div>
                            <label htmlFor="customSlug" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Custom URL
                            </label>
                            <div className="flex items-center border border-zinc-300 dark:border-zinc-600 rounded-lg overflow-hidden">
                                <span className="px-3 ml-2 rounded-4xl text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700">ezinvito.webrizen.com/</span>
                                <input
                                    id="customSlug"
                                    type="text"
                                    name="customSlug"
                                    value={formData.customSlug}
                                    onChange={handleChange}
                                    pattern="[a-z0-9-]+"
                                    title="Only lowercase letters, numbers and hyphens allowed"
                                    placeholder="custom-url"
                                    className="w-full px-3 py-2 bg-transparent outline-none"
                                />
                            </div>
                        </div>

                        {/* Privacy Settings */}
                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Privacy Settings</p>
                            <div className="grid md:grid-cols-3 items-center gap-3">
                                {[
                                    {
                                        value: "public",
                                        label: "Public Event",
                                        description: "Visible to everyone. Anyone can attend.",
                                    },
                                    {
                                        value: "private",
                                        label: "Private Event",
                                        description: "Visible only to invited guests.",
                                    },
                                    {
                                        value: "invite-only",
                                        label: "Invite Only",
                                        description: "Requires an invite code to access or RSVP.",
                                    },
                                ].map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex items-start p-4 h-full border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
                                    >
                                        <div className="flex items-center h-6">
                                            <input
                                                type="radio"
                                                name="privacy"
                                                value={option.value}
                                                checked={formData.privacy === option.value}
                                                onChange={handleChange}
                                                className="w-4 h-4 text-zinc-600 focus:ring-zinc-500 border-zinc-300 dark:border-zinc-600"
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">{option.label}</p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{option.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Template Selection */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Choose Invitation Template</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                {Templates.map((template) => (
                                    <label
                                        key={template.id}
                                        className="relative flex flex-col border-2 border-transparent rounded-lg overflow-hidden cursor-pointer group"
                                    >
                                        <input
                                            type="radio"
                                            name="templateId"
                                            value={template.id}
                                            checked={formData.templateId === template.id}
                                            onChange={handleChange}
                                            className="sr-only peer"
                                        />
                                        <div
                                            className="relative pb-[66%] bg-cover bg-center bg-no-repeat rounded-t-lg transition-transform duration-300 transform group-hover:scale-105"
                                            style={{ backgroundImage: `url(${template.image})` }}
                                        ></div>
                                        <div className="p-2 bg-white dark:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-700">
                                            <p className="text-sm font-medium text-center text-zinc-700 dark:text-zinc-300">{template.label}</p>
                                        </div>
                                        <div className="absolute inset-0 pointer-events-none border-2 border-transparent peer-checked:border-zinc-600 dark:peer-checked:border-zinc-400 rounded-lg"></div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Features Toggles */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <label className="flex items-center gap-3 p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                <input
                                    type="checkbox"
                                    name="galleryEnabled"
                                    checked={formData.galleryEnabled}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-zinc-600 dark:text-zinc-500 focus:ring-zinc-500 border-zinc-300 dark:border-zinc-600 rounded"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Enable Photo Gallery</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                <input
                                    type="checkbox"
                                    name="guestbookEnabled"
                                    checked={formData.guestbookEnabled}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-zinc-600 dark:text-zinc-500 focus:ring-zinc-500 border-zinc-300 dark:border-zinc-600 rounded"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Enable Guestbook</span>
                            </label>
                            <label className="flex items-center gap-3 p-3 border border-zinc-300 dark:border-zinc-600 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                                <input
                                    type="checkbox"
                                    name="qrcodeEnabled"
                                    checked={formData.qrcodeEnabled}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-zinc-600 dark:text-zinc-500 focus:ring-zinc-500 border-zinc-300 dark:border-zinc-600 rounded"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Enable QR Code</span>
                            </label>
                        </div>

                        {/* RSVP Deadline */}
                        <div>
                            <label htmlFor="rsvpDeadline" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                RSVP Deadline (optional)
                            </label>
                            <input
                                id="rsvpDeadline"
                                type="datetime-local"
                                name="rsvpDeadline"
                                value={formData.rsvpDeadline}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                Tags (comma separated)
                            </label>
                            <input
                                id="tags"
                                type="text"
                                name="tags"
                                value={formData.tags.join(', ')}
                                onChange={handleChange}
                                placeholder="tech, conference, networking"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full md:w-auto px-6 py-3 bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-medium rounded-md transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Event'}
                        </button>
                        {error && (
                            <div className="my-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5 p-5 h-min sticky top-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        {showAlert && (
                            <div className="bg-white dark:bg-zinc-500 rounded-lg p-6 max-w-md w-full shadow-xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                                            Almost there!
                                        </h3>
                                        <button
                                            onClick={() => setShowAlert(false)}
                                            className="text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 mb-6">
                                        {alertMessage}
                                    </p>
                                    <div className="flex justify-end">
                                        <button
                                            onClick={() => setShowAlert(false)}
                                            className="px-4 py-2 bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white rounded-md transition-colors"
                                        >
                                            Got it!
                                        </button>
                                    </div>
                                </div>
                        )}
                        <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">Tips for Creating a Great Event</h2>

                        <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-300">
                            {/* Tip 1 */}
                            <div>
                                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">Start with a Clear Description</h3>
                                <p>
                                    A detailed and compelling description helps guests understand what your event is about and why they should attend.
                                    Mention the purpose, agenda, or any special instructions here.
                                </p>
                            </div>

                            {/* Tip 2 */}
                            <div>
                                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">Choose the Right Privacy Setting</h3>
                                <p>
                                    Public events are open to everyone, while Invite Only ensures only those with a code can join. Choose carefully depending on the nature of your event.
                                </p>
                            </div>

                            {/* Tip 3 */}
                            <div>
                                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">Online Events Need a Link</h3>
                                <p>
                                    If this is an online event, be sure to provide a valid meeting link. Double-check it so your attendees don’t miss out!
                                </p>
                            </div>

                            {/* Tip 4 */}
                            <div>
                                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">Enable Optional Features</h3>
                                <p>
                                    Enhance your event by enabling features like Guestbook, Photo Gallery, or QR Code access. These small additions can create a more memorable experience for your guests.
                                </p>
                            </div>

                            {/* Tip 5 */}
                            <div>
                                <h3 className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">Double Check Dates & Times</h3>
                                <p>
                                    Time zones can be tricky — make sure your start and end times are accurate. Don’t worry, you can always come back and update your event after publishing.
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-700">
                            <p className="text-xs italic text-zinc-500 dark:text-zinc-400">
                                Have questions? Visit our help center or reach out to support. We're here to help you create the perfect event.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}