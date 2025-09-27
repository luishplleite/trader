# Design Guidelines: Big Trader

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern trading platforms like TradingView, Interactive Brokers, and fintech apps with a futuristic sci-fi aesthetic to create a professional, high-tech trading environment.

## Core Design Principles
- **Data-First**: Information hierarchy prioritizes critical trading data
- **Minimal Distraction**: Clean interface reduces cognitive load during trading
- **Instant Recognition**: Status indicators use universally understood trading colors
- **Professional Confidence**: Design inspires trust and control

## Color Palette

### Dark Mode Primary
- **Background**: 10 5% 6% (Deep charcoal black)
- **Surface**: 0 0% 11% (Elevated dark panels)
- **Primary Green**: 120 100% 50% (Vibrant trading green)
- **Danger Red**: 0 100% 55% (Alert red for losses)
- **Text Primary**: 0 0% 95% (Near white)
- **Text Secondary**: 0 0% 60% (Muted gray)
- **Border**: 0 0% 20% (Subtle panel separation)

### Accent Colors
- **Success**: 142 76% 36% (Profit green, softer than primary)
- **Warning**: 45 93% 58% (Amber for alerts)
- **Info**: 217 91% 60% (Blue for neutral information)

## Typography
- **Primary Font**: Inter (clean, professional sans-serif)
- **Monospace Font**: JetBrains Mono (for numerical data, prices, timestamps)
- **Scale**: Use standard web typography scale (12px, 14px, 16px, 18px, 24px, 32px)
- **Data Display**: All financial numbers in monospace for consistent alignment

## Layout System
**Tailwind Spacing Units**: Consistent use of 2, 4, 6, 8, 12, 16 units
- **Micro spacing**: p-2, m-2 for tight elements
- **Standard spacing**: p-4, m-4 for most components  
- **Section spacing**: p-6, p-8 for major layout areas
- **Large spacing**: p-12, p-16 for page-level separation

## Component Library

### Navigation
- **Sidebar**: Dark with subtle green accent on active items
- **Top Bar**: Account balance, connection status, emergency stop button
- **Breadcrumbs**: Minimal with green current page indicator

### Data Display
- **Trading Cards**: Dark panels with subtle green border glow
- **Price Displays**: Large monospace numbers with color-coded changes
- **Charts**: Dark theme with green/red candlesticks, grid lines in muted gray
- **Tables**: Alternating row backgrounds, green/red profit indicators

### Controls
- **Primary Buttons**: Green with slight glow effect, rounded corners
- **Secondary Buttons**: Dark with green border
- **Danger Actions**: Red buttons for stop/emergency functions
- **Form Inputs**: Dark with green focus states

### Status Indicators
- **Robot Status**: Large prominent indicator (Active/Inactive)
- **Connection Status**: Dot indicator in top bar
- **Trade Signals**: Clear visual indicators for buy/sell recommendations

### Overlays
- **Modals**: Dark with green accent border
- **Dropdowns**: Consistent with main theme
- **Tooltips**: Dark with green border for data explanations

## Visual Hierarchy
- **Critical Data**: Largest, brightest elements (P/L, balance)
- **Action Items**: High contrast green buttons
- **Secondary Info**: Muted colors, smaller typography
- **Supporting Elements**: Minimal visual weight

## Trading-Specific Design Patterns
- **Profit/Loss Colors**: Green for gains, red for losses (universal)
- **Price Movement**: Green up arrows, red down arrows
- **Order Status**: Clear visual states (pending, filled, cancelled)
- **Risk Indicators**: Warning colors for high-risk settings

This design system creates a professional trading environment that prioritizes clarity, speed of information processing, and user confidence while maintaining the requested futuristic aesthetic through the strategic use of green accents and dark themes.