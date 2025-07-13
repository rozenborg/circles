# Community of Practice Visualization

## Project Overview
An interactive D3.js visualization that displays employees in a community of practice using concentric circles to represent different AI engagement levels. The visualization supports two views: circular (concentric rings) and linear (horizontal progression).

## Architecture

### Core Files
- `index.html` - Main HTML structure with toggle controls
- `styles.css` - Styling for visualization and UI components
- `script.js` - Main visualization logic using D3.js
- `database.js` - Employee database with 100 dummy employees and organizational hierarchy

### Key Components

#### Employee Database (`database.js`)
- **Schema**: employee_id, email, title, org_level_1-5, city, state, country
- **AI Usage Tracking**: last_ai_usage, weeks_used_in_past_4, consecutive_weeks_used, certification status
- **100 Employees**: Realistic dummy data with diverse locations and organizational structures
- **Query Methods**: Filter by org level, location, engagement level, search functionality

#### Visualization Engine (`script.js`)
- **Dual Views**: Circular concentric rings vs linear horizontal progression
- **AI Engagement Levels**: 9 levels from outsider to pro based on AI tool usage patterns
- **Smooth Transitions**: Animated switching between views using group transforms
- **Interactive Elements**: Hover tooltips, click for detailed info, responsive toggle

## AI Engagement Levels

### Level Definitions
1. **Outsider** - Never used AI tools
2. **Edge of Newcomer** - Used AI before but not in past 4 weeks  
3. **Newcomer** - Used AI in past 4 weeks but less than 3/4 weeks
4. **Edge of Explorer** - Used AI 3+ weeks straight before but not recently
5. **Explorer** - Used AI 3+ weeks in past 4 weeks
6. **Edge of Practitioner** - Participating in practitioner certification
7. **Practitioner** - Certified practitioner skills
8. **Edge of Pro** - Participating in pro certification  
9. **Pro** - Certified pro skills

### Visual Representation
- **Circular View**: Concentric rings with pro at center, newcomer at edge, outsiders outside rings
- **Linear View**: Horizontal line with vertical stacking above each section
- **Edge Positioning**: Users "on the edge" appear on ring boundaries or between sections

## Technical Implementation

### Animation System
- **Group Transforms**: Employee bubbles and text move as unified units using SVG group transforms
- **No Separation**: Text and circles maintain perfect relative positioning during animations
- **Smooth Transitions**: 800ms duration with proper background element switching

### Data Flow
1. **Database Generation**: Create 100 employees with realistic AI usage patterns
2. **Engagement Calculation**: Determine AI level based on usage data and certification status
3. **Position Calculation**: Calculate positions for circular or linear layout
4. **Rendering**: Draw background rings/lines, then employee groups with transforms
5. **Interaction**: Handle hover/click events, toggle between views

### Styling System
- **People Bubbles**: White fill with colored outlines matching engagement level
- **Background Rings**: Semi-transparent fills with engagement level colors
- **Typography**: 10px bold text, perfectly centered in bubbles
- **Toggle Control**: Icon-based switch with circle/line representations

## Usage

### Running the Project
1. Open `index.html` in a web browser
2. Visualization loads with circular view by default
3. Click toggle in top-right to switch between views

### Interactions
- **Hover**: Shows tooltip with employee details and AI usage info
- **Click**: Displays detailed employee information in side panel
- **Toggle**: Switches between circular and linear layouts with smooth animation

### Customization
- **Employee Data**: Modify `database.js` to change employee count or add real data
- **Engagement Levels**: Adjust level definitions in `calculateAIEngagementLevel()`
- **Colors**: Update `circleConfig` and `getEmployeeColor()` for different color schemes
- **Layout**: Modify position calculations in `getCircularPosition()` and `getLinearPosition()`

## Development Notes

### Key Technical Decisions
- **D3.js**: Chosen for powerful data binding and smooth animations
- **Group Transforms**: Prevents text/bubble separation during animations
- **Dummy Data**: 100 realistic employees across 15 global locations
- **Responsive Design**: Toggle adapts to show current state clearly

### Performance Considerations
- **Efficient Rendering**: Background elements drawn separately from interactive elements
- **Smooth Animations**: CSS-like transforms for hardware acceleration
- **Event Delegation**: Minimal event handlers for good performance with 100+ elements

### Future Enhancements
- **Real Data Integration**: Connect to actual employee database
- **Filtering**: Add controls to filter by department, location, or engagement level
- **Export**: Add functionality to export visualization as image or data
- **Accessibility**: Improve keyboard navigation and screen reader support

## Dependencies
- D3.js v7 (loaded from CDN)
- Modern browser with SVG support
- No build process required - runs directly in browser