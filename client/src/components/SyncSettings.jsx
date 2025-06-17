import React, { useState } from 'react';
import { updateSyncSettings } from '../services/api';

const SyncSettings = ({ student }) => {
    const [syncTime, setSyncTime] = useState(student.syncTime || '02:00');
    const [syncFrequency, setSyncFrequency] = useState(student.syncFrequency || 'daily');
    const [emailReminders, setEmailReminders] = useState(student.emailReminders !== false);
    const [reminderCount, setReminderCount] = useState(student.reminderCount || 0);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateSyncSettings(student.id, {
                syncTime,
                syncFrequency,
                emailReminders,
            });
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        } catch (error) {
            console.error('Error updating sync settings:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sync Settings</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="syncTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Sync Time
                        </label>
                        <select
                            id="syncTime"
                            value={syncTime}
                            onChange={(e) => setSyncTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            {Array.from({ length: 24 }, (_, i) => {
                                const hour = i.toString().padStart(2, '0');
                                return (
                                    <option key={i} value={`${hour}:00`}>
                                        {hour}:00
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="syncFrequency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Sync Frequency
                        </label>
                        <select
                            id="syncFrequency"
                            value={syncFrequency}
                            onChange={(e) => setSyncFrequency(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        id="emailReminders"
                        type="checkbox"
                        checked={emailReminders}
                        onChange={(e) => setEmailReminders(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailReminders" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                        Enable inactivity email reminders
                    </label>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                    <p className="text-yellow-700 dark:text-yellow-200">
                        <span className="font-semibold">Reminder Stats:</span> {reminderCount} email(s) sent in total.
                        {student.lastReminderSent && ` Last sent on ${new Date(student.lastReminderSent).toLocaleDateString()}.`}
                    </p>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>

                {saveSuccess && (
                    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg">
                        Settings saved successfully!
                    </div>
                )}
            </form>
        </div>
    );
};

export default SyncSettings;