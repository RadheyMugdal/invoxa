'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { IconHexagonNumber1, IconDiscount, IconCurrencyReal, IconEye, IconLayoutDashboard, IconFilter, IconEdit, IconTag, IconDownload, IconMail, IconShare, IconPrinter } from '@tabler/icons-react'

interface FeatureItem {
    icon: React.ComponentType<{ size?: number }>
    text: string
}

interface Feature {
    title: string
    description: string
    items: FeatureItem[]
}

// Micro-interaction component for Smart Invoice Generator
const InvoiceGeneratorAnimation = () => {
    // Animated invoice number
    const [invoiceNumber, setInvoiceNumber] = React.useState(1001)

    // Animated currency
    const currencies = ['$', '€', '£', '¥']
    const [currencyIndex, setCurrencyIndex] = React.useState(0)

    // Animated tax rate
    const [taxRate, setTaxRate] = React.useState(10)

    // Animated discount
    const [discount, setDiscount] = React.useState(0)

    React.useEffect(() => {
        // Cycle invoice number
        const numberInterval = setInterval(() => {
            setInvoiceNumber(prev => prev >= 1005 ? 1001 : prev + 1)
        }, 3000)

        // Cycle currency
        const currencyInterval = setInterval(() => {
            setCurrencyIndex(prev => (prev + 1) % currencies.length)
        }, 2500)

        // Animate tax rate
        const taxInterval = setInterval(() => {
            setTaxRate(prev => prev >= 18 ? 8 : prev + 2)
        }, 4000)

        // Animate discount
        const discountInterval = setInterval(() => {
            setDiscount(prev => prev >= 15 ? 0 : prev + 5)
        }, 3500)

        return () => {
            clearInterval(numberInterval)
            clearInterval(currencyInterval)
            clearInterval(taxInterval)
            clearInterval(discountInterval)
        }
    }, [])

    const currentCurrency = currencies[currencyIndex]

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50">
            <motion.div
                className="relative w-72 h-auto bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
            >
                {/* Animated Header Background */}
                <motion.div
                    className="h-20 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-600 relative overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.div
                        className="absolute inset-0 bg-white/10"
                        animate={{
                            x: ['-100%', '100%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                            repeatDelay: 1
                        }}
                    />
                    <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex justify-between items-end">
                            <motion.div
                                className="text-white text-xs font-bold"
                                key={invoiceNumber}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                INV-{invoiceNumber.toString().padStart(4, '0')}
                            </motion.div>
                            <motion.div
                                className="text-white/80 text-[10px]"
                                key={`date-${invoiceNumber}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                {new Date().toLocaleDateString()}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Invoice Content */}
                <div className="p-5 space-y-3">
                    {/* Bill To Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="text-[10px] text-gray-500 mb-1">Bill To</div>
                        <div className="h-2 w-24 bg-gray-300 rounded mb-1" />
                        <div className="h-1.5 w-16 bg-gray-200 rounded" />
                    </motion.div>

                    {/* Line Items */}
                    <div className="space-y-2">
                        {[0, 1, 2].map((item, index) => (
                            <motion.div
                                key={item}
                                className="flex items-center justify-between py-1.5 border-b border-gray-100"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + index * 0.15 }}
                            >
                                <div className="flex-1">
                                    <motion.div
                                        className="h-2 w-16 bg-gray-700 rounded mb-1"
                                        animate={{ width: ['50px', '70px', '60px'] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                    />
                                    <div className="h-1.5 w-10 bg-gray-400 rounded" />
                                </div>
                                <motion.div
                                    className="text-sm font-semibold text-gray-800"
                                    key={`price-${currencyIndex}-${index}`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentCurrency}{(50 + index * 25).toFixed(2)}
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Calculations */}
                    <motion.div
                        className="space-y-2 pt-2 border-t-2 border-gray-200"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        {/* Subtotal */}
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Subtotal</span>
                            <motion.span
                                className="font-semibold text-gray-700"
                                key={`subtotal-${currencyIndex}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {currentCurrency}187.50
                            </motion.span>
                        </div>

                        {/* Tax */}
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-gray-500">Tax ({taxRate}%)</span>
                            <motion.span
                                className="font-semibold text-blue-600"
                                key={`tax-${taxRate}-${currencyIndex}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentCurrency}{((187.50 * taxRate) / 100).toFixed(2)}
                            </motion.span>
                        </div>

                        {/* Discount - Always takes up space */}
                        <div className="flex justify-between items-center text-xs min-h-[20px]">
                            {discount > 0 ? (
                                <motion.div
                                    className="flex justify-between items-center w-full"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    key={`discount-${discount}`}
                                >
                                    <span className="text-red-500">Discount ({discount}%)</span>
                                    <span className="font-semibold text-red-500">
                                        -{currentCurrency}{((187.50 * discount) / 100).toFixed(2)}
                                    </span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    className="w-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="h-3 w-20 bg-gray-100 rounded" />
                                </motion.div>
                            )}
                        </div>

                        {/* Total */}
                        <motion.div
                            className="flex justify-between items-center py-2 px-3 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 rounded-lg mt-2"
                            animate={{
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="text-white text-sm font-bold">Total</span>
                            <motion.span
                                className="text-white text-lg font-bold"
                                key={`total-${taxRate}-${discount}-${currencyIndex}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, type: 'spring' }}
                            >
                                {currentCurrency}{(187.50 + (187.50 * taxRate) / 100 - (187.50 * discount) / 100).toFixed(2)}
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating Indicators */}
                <motion.div
                    className="absolute top-24 right-2 bg-blue-500 text-white text-[8px] px-2 py-1 rounded-full"
                    animate={{
                        y: [0, -5, 0],
                        opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Auto-updating
                </motion.div>

                {/* Currency Badge */}
                <motion.div
                    className="absolute bottom-4 left-4 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-lg border border-gray-300 flex items-center gap-1"
                    animate={{
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <IconCurrencyReal size={14} />
                    <motion.span
                        key={`currency-badge-${currencyIndex}`}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentCurrency}
                    </motion.span>
                </motion.div>

                {/* Multi-currency indicator */}
                <motion.div
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-emerald-500 text-white text-[8px] px-2 py-0.5 rounded-full shadow-lg"
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <IconHexagonNumber1 size={12} />
                </motion.div>
            </motion.div>
        </div>
    )
}

// Micro-interaction component for Invoice Management
const InvoiceManagementAnimation = () => {
    const statuses = ['draft', 'sent', 'paid', 'overdue']
    const colors = ['bg-gray-400', 'bg-blue-400', 'bg-green-400', 'bg-red-400']
    const [filterStatus, setFilterStatus] = React.useState('all')

    React.useEffect(() => {
        const filterInterval = setInterval(() => {
            setFilterStatus(prev => {
                const filters = ['all', 'paid', 'sent', 'overdue']
                const currentIndex = filters.indexOf(prev)
                return filters[(currentIndex + 1) % filters.length]
            })
        }, 3000)

        return () => clearInterval(filterInterval)
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
            <div className="w-72 h-auto">
                {/* Dashboard Header */}
                <motion.div
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-16 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 relative">
                        <motion.div
                            className="absolute inset-0 bg-white/10"
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                                repeatDelay: 1
                            }}
                        />
                        <div className="absolute bottom-2 left-4">
                            <div className="h-3 w-24 bg-white/90 rounded mb-1" />
                            <div className="h-1.5 w-16 bg-white/60 rounded" />
                        </div>
                        {/* Filter Badge */}
                        <motion.div
                            className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm text-white text-[8px] px-2 py-1 rounded-full border border-white/30 flex items-center gap-1"
                            key={`filter-${filterStatus}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <IconFilter size={10} />
                            Filter: {filterStatus}
                        </motion.div>
                    </div>
                    {/* Stats Row */}
                    <div className="p-4 grid grid-cols-3 gap-2">
                        {['Total', 'Paid', 'Pending'].map((stat, i) => (
                            <motion.div
                                key={stat}
                                className="text-center"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                            >
                                <div className={`h-4 w-12 mx-auto rounded ${['bg-blue-500', 'bg-green-500', 'bg-yellow-500'][i]} mb-1`} />
                                <div className="h-1.5 w-10 mx-auto bg-gray-300 rounded" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Invoice Cards Grid */}
                <div className="grid grid-cols-2 gap-3">
                    {[0, 1, 2, 3].map((index) => (
                        <motion.div
                            key={index}
                            className="relative bg-white rounded-lg shadow-lg border border-gray-200 p-3 cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1, type: 'spring', stiffness: 200 }}
                            whileHover={{
                                scale: 1.05,
                                y: -5,
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                            }}
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-2 w-10 bg-gray-300 rounded" />
                                <motion.div
                                    className={`h-2 w-2 rounded-full ${colors[index]}`}
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="space-y-1.5 mb-2">
                                <div className="h-1.5 w-full bg-gray-200 rounded" />
                                <div className="h-1.5 w-3/4 bg-gray-200 rounded" />
                                <div className="h-1.5 w-1/2 bg-gray-200 rounded" />
                            </div>

                            {/* Status Badge */}
                            <motion.div
                                className={`${colors[index]} text-white text-[8px] px-2 py-0.5 rounded-full inline-block`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 + index * 0.1 }}
                            >
                                {statuses[index]}
                            </motion.div>

                            {/* Hover Icon */}
                            <motion.div
                                className="absolute top-2 right-2 opacity-0"
                                whileHover={{ opacity: 1 }}
                            >
                                <IconEdit size={12} className="text-gray-400" />
                            </motion.div>

                            {/* Amount */}
                            <motion.div
                                className="mt-2 text-xs font-semibold text-gray-700"
                                animate={{
                                    opacity: [0.7, 1, 0.7]
                                }}
                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                            >
                                ${(100 + index * 50).toFixed(2)}
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Sorting Indicator */}
                <motion.div
                    className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-[8px] px-2 py-1 rounded-lg border border-gray-300 flex items-center gap-1 shadow-md"
                    animate={{
                        y: [0, -3, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    <IconLayoutDashboard size={12} />
                    Sorted by date
                </motion.div>
            </div>
        </div>
    )
}

// Micro-interaction component for PDF Download & Sharing
const PDFSharingAnimation = () => {
    const [sharingMethod, setSharingMethod] = React.useState('download')
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        // Cycle through sharing methods
        const methodInterval = setInterval(() => {
            setSharingMethod(prev => {
                const methods = ['download', 'email', 'share', 'print']
                const currentIndex = methods.indexOf(prev)
                return methods[(currentIndex + 1) % methods.length]
            })
        }, 3000)

        // Animate progress
        const progressInterval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 0 : prev + 2))
        }, 50)

        return () => {
            clearInterval(methodInterval)
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-6 bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50">
            <div className="w-72">
                {/* Main Document */}
                <motion.div
                    className="relative bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                >
                    {/* Document Header */}
                    <div className="h-16 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 relative">
                        <motion.div
                            className="absolute inset-0 bg-white/10"
                            animate={{
                                x: ['-100%', '100%']
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear',
                                repeatDelay: 1
                            }}
                        />
                        <div className="absolute bottom-3 left-4">
                            <div className="h-2 w-20 bg-white/90 rounded" />
                        </div>
                        {/* PDF Badge */}
                        <motion.div
                            className="absolute top-2 right-2 bg-white text-red-500 text-[10px] font-bold px-2 py-1 rounded shadow-lg"
                            animate={{
                                scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            PDF
                        </motion.div>
                    </div>

                    {/* Document Content */}
                    <div className="p-5 space-y-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                className="h-2 bg-gray-200 rounded"
                                style={{ width: `${100 - index * 8}%` }}
                                initial={{ opacity: 0, scaleX: 0 }}
                                animate={{ opacity: 1, scaleX: 1 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                            />
                        ))}
                        <div className="h-16 bg-gray-100 rounded mt-3 flex items-center justify-center">
                            <div className="text-center">
                                <div className="h-2 w-16 bg-gray-300 rounded mx-auto mb-2" />
                                <div className="h-1.5 w-12 bg-gray-200 rounded mx-auto" />
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <motion.div
                        className="mx-5 h-2 bg-gray-200 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-orange-500 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1 }}
                        />
                    </motion.div>
                    <div className="px-5 pt-2 pb-3">
                        <div className="flex justify-between items-center text-[8px] text-gray-500">
                            <span>Processing...</span>
                            <motion.span
                                key={`progress-${progress}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.1 }}
                            >
                                {progress}%
                            </motion.span>
                        </div>
                    </div>
                </motion.div>

                {/* Sharing Options */}
                <div className="grid grid-cols-4 gap-2 mt-4">
                    {/* Download */}
                    <motion.div
                        className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                            sharingMethod === 'download' ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                        }`}
                        animate={{
                            scale: sharingMethod === 'download' ? [1, 1.05, 1] : 1
                        }}
                        transition={{ duration: 2, repeat: sharingMethod === 'download' ? Infinity : 0 }}
                    >
                        <motion.div
                            animate={{ y: sharingMethod === 'download' ? [0, -5, 0] : 0 }}
                            transition={{ duration: 1.5, repeat: sharingMethod === 'download' ? Infinity : 0 }}
                        >
                            <IconDownload size={20} className={sharingMethod === 'download' ? 'text-green-500' : 'text-gray-400'} />
                        </motion.div>
                        <div className="text-[8px] mt-1 text-gray-600">Save</div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                            sharingMethod === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
                        }`}
                        animate={{
                            x: sharingMethod === 'email' ? [0, 3, -3, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: sharingMethod === 'email' ? Infinity : 0 }}
                    >
                        <motion.div
                            animate={{ scale: sharingMethod === 'email' ? [1, 0.95, 1] : 1 }}
                            transition={{ duration: 2, repeat: sharingMethod === 'email' ? Infinity : 0 }}
                        >
                            <IconMail size={20} className={sharingMethod === 'email' ? 'text-blue-500' : 'text-gray-400'} />
                        </motion.div>
                        <div className="text-[8px] mt-1 text-gray-600">Email</div>
                    </motion.div>

                    {/* Share */}
                    <motion.div
                        className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                            sharingMethod === 'share' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'
                        }`}
                        animate={{
                            rotate: sharingMethod === 'share' ? [0, 15, -15, 0] : 0
                        }}
                        transition={{ duration: 2, repeat: sharingMethod === 'share' ? Infinity : 0 }}
                    >
                        <motion.div
                            animate={{ scale: sharingMethod === 'share' ? [1, 1.2, 1] : 1 }}
                            transition={{ duration: 2, repeat: sharingMethod === 'share' ? Infinity : 0 }}
                        >
                            <IconShare size={20} className={sharingMethod === 'share' ? 'text-purple-500' : 'text-gray-400'} />
                        </motion.div>
                        <div className="text-[8px] mt-1 text-gray-600">Share</div>
                    </motion.div>

                    {/* Print */}
                    <motion.div
                        className={`flex flex-col items-center p-2 rounded-lg border-2 transition-all ${
                            sharingMethod === 'print' ? 'border-gray-600 bg-gray-100' : 'border-gray-200 bg-white'
                        }`}
                        animate={{
                            y: sharingMethod === 'print' ? [0, 2, 0] : 0
                        }}
                        transition={{ duration: 1.5, repeat: sharingMethod === 'print' ? Infinity : 0 }}
                    >
                        <IconPrinter size={20} className={sharingMethod === 'print' ? 'text-gray-600' : 'text-gray-400'} />
                        <div className="text-[8px] mt-1 text-gray-600">Print</div>
                    </motion.div>
                </div>

                {/* Status Indicator */}
                <motion.div
                    className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-[8px] px-2 py-1 rounded-lg border border-gray-300 shadow-md flex items-center gap-1"
                    key={`status-${sharingMethod}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-green-500"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    {sharingMethod === 'download' && 'Downloading...'}
                    {sharingMethod === 'email' && 'Sending...'}
                    {sharingMethod === 'share' && 'Generating link...'}
                    {sharingMethod === 'print' && 'Preparing...'}
                </motion.div>
            </div>
        </div>
    )
}

const Features = () => {
    const features: Feature[] = [
        {
            title: 'Smart Invoice Generator',
            description: 'Create professional invoices in seconds with a clean, modern layout.',
            items: [
                { icon: IconHexagonNumber1, text: 'Auto invoice numbers' },
                { icon: IconDiscount, text: 'Tax, discount & shipping support' },
                { icon: IconCurrencyReal, text: 'Multi-currency support' },
                { icon: IconEye, text: 'Real-time preview' },
            ]
        },
        {
            title: 'Invoice Management',
            description: 'Stay organized as you grow.',
            items: [
                { icon: IconLayoutDashboard, text: 'View all invoices in one dashboard' },
                { icon: IconFilter, text: 'Filter by client, status, or date' },
                { icon: IconEdit, text: 'Edit, duplicate, or delete invoices' },
                { icon: IconTag, text: 'Draft, sent, paid, overdue statuses' },
            ]
        },
        {
            title: 'PDF Download & Sharing',
            description: 'Send invoices the way clients prefer.',
            items: [
                { icon: IconDownload, text: 'One-click PDF download' },
                { icon: IconMail, text: 'Email invoices directly' },
                { icon: IconShare, text: 'Share invoice links' },
                { icon: IconPrinter, text: 'Print-ready formats' },
            ]
        }
    ]

    const animations = [
        InvoiceGeneratorAnimation,
        InvoiceManagementAnimation,
        PDFSharingAnimation
    ]

    const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
        const ref = React.useRef(null)
        const isInView = useInView(ref, { once: true, margin: '-100px' })
        const isEven = index % 2 === 0
        const AnimationComponent = animations[index]

        return (
            <motion.div
                ref={ref}
                className={`grid grid-cols-1 md:grid-cols-2 ${index === 0 && 'border-t'}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Content Column */}
                <motion.div
                    className={`py-8 sm:py-12 space-y-3 sm:space-y-4 px-4 sm:px-8 ${isEven ? '' : 'order-2'} ${isEven ? 'md:border-r' : 'md:order-2 md:border-l'}`}
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -30 : 30 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className='space-y-2'>
                        <motion.h1
                            className='text-2xl sm:text-3xl'
                            initial={{ opacity: 0, y: 10 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{ delay: 0.3 }}
                        >
                            {feature.title}
                        </motion.h1>
                        <motion.p
                            className='text-sm sm:text-base text-primary/75'
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {feature.description}
                        </motion.p>
                    </div>
                    <div>
                        <ul className='space-y-2'>
                            {feature.items.map((item, itemIndex) => (
                                <motion.li
                                    key={itemIndex}
                                    className='flex text-xs sm:text-sm items-center text-primary gap-2'
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: 0.5 + itemIndex * 0.1 }}
                                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: 'spring', stiffness: 400 }}
                                    >
                                        <item.icon size={16} className="sm:size-[18px]" />
                                    </motion.div>
                                    {item.text}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </motion.div>

                {/* Animation Column */}
                <motion.div
                    className={`bg-gradient-to-br from-gray-50 to-gray-100 ${isEven ? '' : 'order-1 md:order-1'} relative overflow-hidden min-h-[300px]`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    whileHover={{ backgroundColor: 'rgb(249, 250, 251)' }}
                >
                    {isInView && <AnimationComponent />}
                </motion.div>
            </motion.div>
        )
    }

    return (
        <div className='w-full border-b'>
            <div className='max-w-4xl mx-auto space-y-12 border-x pt-16 sm:pt-24'>
                <motion.div
                    className='space-y-3 sm:space-y-4 flex flex-col text-center px-4 sm:px-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.h2
                        className='text-3xl sm:text-4xl lg:text-5xl text-pretty'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Everything you need to invoice smarter
                    </motion.h2>
                    <motion.p
                        className='text-sm sm:text-base max-w-3xl text-balance mx-auto'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Create, send, and manage invoices from one simple dashboard.
                    </motion.p>
                </motion.div>

                <div className='divide-border divide-y'>
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features
