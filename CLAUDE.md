# Community of Practice Visualization

## Project Overview
An interactive D3.js visualization that displays employees in a community of practice using concentric circles to represent different AI engagement levels. The visualization supports multiple views and display modes with three independent toggle controls.

## Architecture

### Core Files
- `index.html` - Main HTML structure with three toggle controls
- `styles.css` - Styling for visualization and UI components
- `script.js` - Main visualization logic using D3.js
- `database.js` - Employee database with 100 dummy employees and organizational hierarchy

### Key Components

#### Employee Database (`database.js`)
- **Schema**: employee_id, email, title, org_level_1-5, city, state, country, photo_url
- **AI Usage Tracking**: last_ai_usage, weeks_used_in_past_4, consecutive_weeks_used, certification status
- **100 Employees**: Realistic dummy data with diverse locations and organizational structures
- **Profile Photos**: 85% have Pravatar profile photos, 15% show colored initials
- **Query Methods**: Filter by org level, location, engagement level, search functionality

#### Visualization Engine (`script.js`)
- **Multiple Views**: Circular concentric rings vs linear horizontal progression
- **Display Modes**: Photo bubbles vs colored dots for scalability
- **Ring Styles**: Outline rings vs filled rings for visual preference
- **AI Engagement Levels**: 3 simplified levels with edge states
- **Smooth Transitions**: Animated switching between views using group transforms
- **Interactive Elements**: Hover tooltips, click for detailed info, three independent toggles

## AI Engagement Levels

### Simplified 3-Level System
1. **Outsider** - Never used AI tools (Gray)
2. **Edge of Newcomer** - Used AI before but not recently (Gray - transitioning)
3. **Newcomer** - Active AI usage, getting started (Blue)
4. **Edge of Explorer** - Transitioning from newcomer to explorer (Blue - cusp color)
5. **Explorer** - Regular AI usage, exploring capabilities (Blueish Purple)
6. **Edge of Practitioner** - Transitioning to advanced usage (Blueish Purple - cusp color)
7. **Practitioner** - Advanced AI skills, certified usage (Purple)

### Color Scheme
- **Newcomer Ring**: Blue (#3B82F6)
- **Explorer Ring**: Blueish Purple (#6366F1)
- **Practitioner Ring**: Purple (#8B5CF6)
- **Cusp Logic**: Edge users get the color of the ring they're transitioning FROM

### Visual Representation
- **Circular View**: Concentric rings with practitioner at center, newcomer at edge, outsiders outside rings
- **Linear View**: Horizontal sections with edge users grouped with their outer section
- **Edge Positioning**: Edge users appear within their source section, not between sections

## Control System

### Three Independent Toggles

#### 1. View Toggle (Top)
- **Circle Icon**: Concentric rings layout
- **Line Icon**: Linear horizontal layout
- **Function**: Controls spatial arrangement of employees

#### 2. Display Toggle (Middle) 
- **Dot Icon** (Default): Small 6px colored dots - ideal for large datasets
- **Photo Icon**: Large 24px bubbles with profile photos/initials - detailed view
- **Function**: Controls individual employee representation

#### 3. Ring Style Toggle (Bottom)
- **Outline Icon** (Default): Clean colored outlines with transparent interiors
- **Filled Icon**: Traditional filled rings with colored backgrounds
- **Function**: Controls background ring appearance

### Toggle Combinations
All 8 combinations work independently:
- Circular + Dots + Outline (default)
- Circular + Dots + Filled
- Circular + Photos + Outline
- Circular + Photos + Filled
- Linear + Dots + Outline
- Linear + Dots + Filled
- Linear + Photos + Outline
- Linear + Photos + Filled

## Technical Implementation

### Animation System
- **Group Transforms**: Employee bubbles and text move as unified units using SVG group transforms
- **No Separation**: Text and circles maintain perfect relative positioning during animations
- **Smooth Transitions**: 800ms duration with proper background element switching
- **Independent Rendering**: Display and ring style toggles trigger immediate re-render

### Mathematical Sizing
- **Inner Radius**: 120px (practitioner center)
- **Ring Spacing**: 160px (2/3rds of inner diameter)
- **Total Bullseye**: ~440px radius, fills 900x900 canvas with good margins
- **Outsider Positioning**: 490px radius for clear separation

### Data Flow
1. **Database Generation**: Create 100 employees with realistic AI usage patterns and photos
2. **Engagement Calculation**: Determine AI level based on usage data and certification status
3. **Position Calculation**: Calculate positions for circular or linear layout
4. **Rendering**: Draw background rings/lines, then employee groups with transforms
5. **Interaction**: Handle hover/click events, manage three independent toggles

### Styling System
- **Display Modes**:
  - Dot mode: 6px colored circles for scalable visualization
  - Photo mode: 24px bubbles with Pravatar photos or colored initials
- **Ring Styles**:
  - Outline: 3px colored strokes, transparent fills, 0.6 opacity
  - Filled: Colored fills, no strokes, 0.3 opacity
- **Typography**: 18px bold dark gray labels, 14px employee initials
- **Interactive Feedback**: Hover effects, active toggle states

## Usage

### Running the Project
1. Open `index.html` in a web browser
2. Visualization loads with circular view, dots, and outline rings by default
3. Use three toggles to customize the visualization

### Interactions
- **Hover**: Shows tooltip with employee details and AI usage info
- **Click**: Displays detailed employee information in side panel
- **View Toggle**: Switches between circular and linear layouts with smooth animation
- **Display Toggle**: Instantly switches between dots and photos
- **Ring Toggle**: Instantly switches between outline and filled rings

### Scalability Features
- **Dot Mode**: Handles large datasets without visual clutter
- **Photo Mode**: Detailed view for smaller groups or focused analysis
- **Outline Rings**: Clean, minimalist background
- **Filled Rings**: Traditional, more prominent background

## Customization

### Employee Data
- Modify `database.js` to change employee count or add real data
- Update photo URLs or disable photos by setting `photo_url: null`
- Adjust AI usage patterns and certification rates

### Visual Styling
- Update `circleConfig` colors for different color schemes
- Modify `getEmployeeColor()` for custom level colors
- Adjust ring spacing by changing `DIAL` calculation
- Customize toggle icons in `index.html`

### Layout and Sizing
- Modify `INNER_RADIUS` and `DIAL` for different proportions
- Update canvas size by changing `width` and `height`
- Adjust employee bubble sizes in `getEmployeeRadius()`

## Development Notes

### Key Technical Decisions
- **D3.js**: Chosen for powerful data binding and smooth animations
- **Group Transforms**: Prevents text/bubble separation during animations
- **Pravatar Integration**: Reliable avatar service for realistic profile photos
- **Independent Toggles**: Maximum user control and flexibility
- **Mathematical Proportions**: 2/3rds diameter spacing for visual harmony

### Performance Considerations
- **Efficient Rendering**: Background elements drawn separately from interactive elements
- **Instant Toggle Response**: Display and ring changes don't animate for immediate feedback
- **Scalable Architecture**: Dot mode handles hundreds of employees efficiently
- **Event Delegation**: Minimal event handlers for good performance with 100+ elements

### Code Quality
- **Modular Design**: Separate methods for different rendering modes
- **Consistent Patterns**: Unified toggle system across all three controls
- **Clean Separation**: View logic separate from display and styling logic
- **Maintainable Structure**: Clear function organization and naming

## Future Enhancements
- **Real Data Integration**: Connect to actual employee database and photo systems
- **Advanced Filtering**: Add controls to filter by department, location, or engagement level
- **Export Functionality**: Add ability to export visualization as image or data
- **Accessibility**: Improve keyboard navigation and screen reader support
- **Custom Color Themes**: Allow users to define their own color schemes
- **Animation Controls**: Add options to adjust or disable transition animations

## Dependencies
- D3.js v7 (loaded from CDN)
- Pravatar.cc (for profile photos)
- Modern browser with SVG support
- No build process required - runs directly in browser