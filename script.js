// Initialize the employee database
const employeeDB = new EmployeeDatabase();
const employees = employeeDB.getAllEmployees();

// How wide is one dial step? = 2/3rds of the inner circle diameter
const INNER_RADIUS = 120;         // Practitioner radius (larger to fill container)
const DIAL = (INNER_RADIUS * 2) * (2/3);  // 160 px (2/3rds of inner diameter)

// Radii grow by one DIAL each time - simplified to 3 levels
const circleConfig = {
    practitioner: { radius: INNER_RADIUS,            color: "#8B5CF6", label: "Practitioner" }, // Purple
    explorer:     { radius: INNER_RADIUS + 1*DIAL,   color: "#6366F1", label: "Explorer" },     // Blueish purple  
    newcomer:     { radius: INNER_RADIUS + 2*DIAL,   color: "#3B82F6", label: "Newcomer" }      // Blue
};

const OUTSIDER_RADIUS = INNER_RADIUS + 2*DIAL + 40; // perfect distance from newcomer ring

function getRingArray() {
    // order from outermost to innermost for proper layering
    return ['newcomer','explorer','practitioner']
        .map(k => ({level: k, ...circleConfig[k]}));
}

class CommunityVisualization {
    constructor(containerId) {
        this.container = d3.select(containerId);
        this.width = 900;
        this.height = 900;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.outsiderRadius = OUTSIDER_RADIUS; // Area outside all rings for outsiders
        this.isLinearView = false;
        this.showPhotos = false; // true = photos, false = colored dots
        this.filledRings = false; // true = filled rings, false = outline rings
        
        this.setupSVG();
        this.setupTooltip();
        this.setupToggle();
        this.renderVisualization();
    }
    
    setupSVG() {
        this.svg = this.container
            .attr("width", this.width)
            .attr("height", this.height);
    }
    
    setupTooltip() {
        this.tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");
    }
    
    setupToggle() {
        // View toggle (circle/linear)
        d3.select(".toggle-container:not(.display-toggle)").on("click", () => {
            this.isLinearView = !this.isLinearView;
            this.updateToggleState();
            this.transitionToView();
        });
        
        // Display toggle (photos/dots)
        d3.select(".display-toggle").on("click", () => {
            this.showPhotos = !this.showPhotos;
            this.updateToggleState();
            this.renderVisualization(); // Re-render with new display mode
        });
        
        // Ring style toggle (outline/filled)
        d3.select(".ring-toggle").on("click", () => {
            this.filledRings = !this.filledRings;
            this.updateToggleState();
            this.renderVisualization(); // Re-render with new ring style
        });
        
        // Initialize toggle state
        this.updateToggleState();
    }
    
    updateToggleState() {
        // View toggle state
        const viewToggleSwitch = d3.select("#view-toggle");
        const circleIcon = d3.select(".circle-icon");
        const lineIcon = d3.select(".line-icon");
        
        if (this.isLinearView) {
            viewToggleSwitch.classed("active", true);
            circleIcon.classed("active", false);
            lineIcon.classed("active", true);
        } else {
            viewToggleSwitch.classed("active", false);
            circleIcon.classed("active", true);
            lineIcon.classed("active", false);
        }
        
        // Display toggle state
        const displayToggleSwitch = d3.select("#display-toggle");
        const photoIcon = d3.select(".photo-icon");
        const dotIcon = d3.select(".dot-icon");
        
        if (this.showPhotos) {
            // Photos (right side) - toggle active/right
            displayToggleSwitch.classed("active", true);
            photoIcon.classed("active", true);
            dotIcon.classed("active", false);
        } else {
            // Dots (left side) - toggle inactive/left
            displayToggleSwitch.classed("active", false);
            photoIcon.classed("active", false);
            dotIcon.classed("active", true);
        }
        
        // Ring style toggle state
        const ringToggleSwitch = d3.select("#ring-toggle");
        const outlineIcon = d3.select(".outline-icon");
        const filledIcon = d3.select(".filled-icon");
        
        if (this.filledRings) {
            // Filled rings (right side) - toggle active/right
            ringToggleSwitch.classed("active", true);
            outlineIcon.classed("active", false);
            filledIcon.classed("active", true);
        } else {
            // Outline rings (left side) - toggle inactive/left
            ringToggleSwitch.classed("active", false);
            outlineIcon.classed("active", true);
            filledIcon.classed("active", false);
        }
    }
    
    renderVisualization() {
        this.svg.selectAll("*").remove(); // Clear previous render
        this.drawBackground();
        this.drawEmployees();
    }
    
    drawBackground() {
        // Only draw the background appropriate for current view
        if (this.isLinearView) {
            this.drawLinearView();
        } else {
            this.drawCircleRings();
            this.drawCircleLabels();
        }
    }
    
    drawLinearView() {
        const sections = ['Outsider', 'Newcomer', 'Explorer', 'Practitioner'];
        const sectionWidth = this.width / 4;
        const baseY = this.height - 120;
        
        // Draw horizontal line
        this.svg.append("line")
            .attr("class", "linear-line")
            .attr("x1", 0)
            .attr("y1", baseY)
            .attr("x2", this.width)
            .attr("y2", baseY)
            .attr("stroke", "#4a5568")
            .attr("stroke-width", 3);
            
        // Draw section dividers and labels
        sections.forEach((section, i) => {
            const x = sectionWidth * i + sectionWidth / 2;
            
            // Section divider
            if (i > 0) {
                this.svg.append("line")
                    .attr("class", "linear-line")
                    .attr("x1", sectionWidth * i)
                    .attr("y1", baseY - 20)
                    .attr("x2", sectionWidth * i)
                    .attr("y2", baseY + 20)
                    .attr("stroke", "#9CA3AF")
                    .attr("stroke-width", 2);
            }
            
            // Section label
            this.svg.append("text")
                .attr("class", "section-label")
                .attr("x", x)
                .attr("y", baseY + 40)
                .attr("text-anchor", "middle")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .style("fill", "#4a5568")
                .text(section);
        });
    }
    
    transitionToView() {
        const duration = 800;
        
        // Step 1: Immediately remove ALL background elements (ensure clean slate)
        this.svg.selectAll(".circle-ring, .circle-label, .section-label, .linear-line").remove();
        
        // Step 2: Calculate new positions
        employees.forEach(employee => {
            const newPosition = this.getEmployeePosition(employee);
            employee.x = newPosition.x;
            employee.y = newPosition.y;
        });
        
        // Step 3: Animate only the group transforms - children stay in place relative to group
        this.svg.selectAll(".employee")
            .transition()
            .duration(duration)
            .ease(d3.easeLinear)
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
        
        // Step 4: After a short delay, redraw background elements
        setTimeout(() => {
            // Draw the correct background for current view
            if (this.isLinearView) {
                this.drawLinearView();
            } else {
                this.drawCircleRings();
                this.drawCircleLabels();
            }
            
            // Ensure employees stay on top by moving them to end of DOM
            this.svg.selectAll(".employee").each(function() {
                this.parentNode.appendChild(this);
            });
            
            // Fade in the newly drawn background elements with proper opacity
            this.svg.selectAll(".circle-ring")
                .style("opacity", 0)
                .transition()
                .duration(duration / 3)
                .style("opacity", 0.3);
                
            this.svg.selectAll(".circle-label, .section-label, .linear-line")
                .style("opacity", 0)
                .transition()
                .duration(duration / 3)
                .style("opacity", 1);
        }, duration / 4);
    }
    
    drawCircleRings() {
        getRingArray().forEach(ring => {
            this.svg.append("circle")
                .attr("class", "circle-ring")
                .attr("cx", this.centerX)
                .attr("cy", this.centerY)
                .attr("r", ring.radius)
                .style("fill", this.filledRings ? ring.color : "none")
                .style("stroke", this.filledRings ? "none" : ring.color)
                .style("stroke-width", this.filledRings ? 0 : 3)
                .style("opacity", this.filledRings ? 0.3 : 0.6)
                .style("pointer-events", "none"); // Ensure rings don't interfere with employee interactions
        });
    }
    
    drawCircleLabels() {
        Object.entries(circleConfig).forEach(([level, config]) => {
            this.svg.append("text")
                .attr("class", "circle-label")
                .attr("x", this.centerX)
                .attr("y", this.centerY - config.radius + 25)
                .attr("text-anchor", "middle")
                .text(config.label)
                .style("fill", "#374151")
                .style("font-weight", "bold")
                .style("font-size", "18px");
        });
    }
    
    drawEmployees() {
        // Position employees based on their engagement level
        employees.forEach((employee, index) => {
            const position = this.getEmployeePosition(employee);
            employee.x = position.x;
            employee.y = position.y;
        });

        const employeeGroups = this.svg.selectAll(".employee")
            .data(employees, d => d.employee_id)
            .enter()
            .append("g")
            .attr("class", "employee")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);
            
        // Draw employee dots at origin (0,0) of each group
        employeeGroups.append("circle")
            .attr("class", "employee-dot")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", d => this.getEmployeeRadius(d))
            .style("fill", "white")
            .style("stroke", d => this.getEmployeeColor(d))
            .style("stroke-width", 2)
            .style("opacity", 0.9)
            .on("mouseover", (event, d) => this.showTooltip(event, d))
            .on("mouseout", () => this.hideTooltip())
            .on("click", (event, d) => this.showEmployeeInfo(d));
            
        if (this.showPhotos) {
            // Photo mode: show photos and initials as before
            const defs = this.svg.select("defs").empty() ? this.svg.append("defs") : this.svg.select("defs");
            
            // Add profile photos for employees who have them
            employeeGroups.filter(d => d.photo_url).each(function(d) {
                const group = d3.select(this);
                const radius = 24; // Fixed radius value
                const patternId = `photo-${d.employee_id}`;
                
                // Create pattern
                const pattern = defs.append("pattern")
                    .attr("id", patternId)
                    .attr("patternUnits", "userSpaceOnUse")
                    .attr("width", radius * 2)
                    .attr("height", radius * 2)
                    .attr("x", -radius)
                    .attr("y", -radius);
                    
                pattern.append("image")
                    .attr("href", d.photo_url)
                    .attr("width", radius * 2)
                    .attr("height", radius * 2)
                    .attr("preserveAspectRatio", "xMidYMid slice");
                    
                // Apply pattern to the circle
                group.select(".employee-dot")
                    .style("fill", `url(#${patternId})`);
            });
                
            // Add employee initials for those without photos
            employeeGroups.filter(d => !d.photo_url)
                .append("text")
                .attr("x", 0)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .style("fill", d => this.getEmployeeColor(d))
                .style("pointer-events", "none")
                .style("user-select", "none")
                .text(d => this.getInitials(d.name));
        } else {
            // Dot mode: just show colored dots
            employeeGroups.select(".employee-dot")
                .style("fill", d => this.getEmployeeColor(d));
        }
    }
    
    getEmployeePosition(employee) {
        if (this.isLinearView) {
            return this.getLinearPosition(employee);
        } else {
            return this.getCircularPosition(employee);
        }
    }
    
    getLinearPosition(employee) {
        const sections = ['outsider', 'newcomer', 'explorer', 'practitioner'];
        const edgeSections = ['edge_of_newcomer', 'edge_of_explorer', 'edge_of_practitioner'];
        
        const sectionWidth = this.width / 4; // Divide into 4 sections
        const baseY = this.height - 120; // Bottom line position
        
        let sectionIndex, x, levelEmployees, employeeIndex, stackHeight;
        
        // Map edge people to their outer section (where they're transitioning FROM)
        if (employee.engagement_level === 'edge_of_newcomer') {
            sectionIndex = 0; // Outsider section
        } else if (employee.engagement_level === 'edge_of_explorer') {
            sectionIndex = 1; // Newcomer section  
        } else if (employee.engagement_level === 'edge_of_practitioner') {
            sectionIndex = 2; // Explorer section
        } else {
            // Regular positioning for non-edge employees
            sectionIndex = sections.indexOf(employee.engagement_level);
        }
        
        x = sectionWidth * sectionIndex + sectionWidth / 2;
        
        // Group edge people with their corresponding outer section
        let filterLevel = employee.engagement_level;
        if (employee.engagement_level === 'edge_of_newcomer') {
            // Include edge_of_newcomer with outsiders
            levelEmployees = employees.filter(e => e.engagement_level === 'outsider' || e.engagement_level === 'edge_of_newcomer');
        } else if (employee.engagement_level === 'edge_of_explorer') {
            // Include edge_of_explorer with newcomers
            levelEmployees = employees.filter(e => e.engagement_level === 'newcomer' || e.engagement_level === 'edge_of_explorer');
        } else if (employee.engagement_level === 'edge_of_practitioner') {
            // Include edge_of_practitioner with explorers
            levelEmployees = employees.filter(e => e.engagement_level === 'explorer' || e.engagement_level === 'edge_of_practitioner');
        } else {
            levelEmployees = employees.filter(e => e.engagement_level === employee.engagement_level);
        }
        
        employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
        
        const employeesPerRow = Math.ceil(Math.sqrt(levelEmployees.length));
        const row = Math.floor(employeeIndex / employeesPerRow);
        const col = employeeIndex % employeesPerRow;
        
        const offsetX = (col - (employeesPerRow - 1) / 2) * 20;
        const offsetY = row * 25;
        
        return {
            x: x + offsetX,
            y: baseY - offsetY - 50
        };
    }
    
    getCircularPosition(employee) {
        let radius, levelEmployees, employeeIndex, angleStep, angle;
        
        switch (employee.engagement_level) {
            case 'outsider':
                // Position outsiders in white space outside all rings
                levelEmployees = employees.filter(e => e.engagement_level === 'outsider');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                radius = this.outsiderRadius;
                break;
                
            case 'edge_of_newcomer':
                // Position on the boundary of newcomer ring (outer edge)
                levelEmployees = employees.filter(e => e.engagement_level === 'edge_of_newcomer');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                radius = circleConfig.newcomer.radius;
                break;
                
            case 'newcomer':
                // Position within the newcomer ring
                levelEmployees = employees.filter(e => e.engagement_level === 'newcomer');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                const newcomerMin = circleConfig.explorer.radius + 10;
                const newcomerMax = circleConfig.newcomer.radius - 10;
                radius = newcomerMin + Math.random() * (newcomerMax - newcomerMin);
                break;
                
            case 'edge_of_explorer':
                // Position on the boundary between explorer and newcomer
                levelEmployees = employees.filter(e => e.engagement_level === 'edge_of_explorer');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                radius = circleConfig.explorer.radius;
                break;
                
            case 'explorer':
                // Position within the explorer ring
                levelEmployees = employees.filter(e => e.engagement_level === 'explorer');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                const explorerMin = circleConfig.practitioner.radius + 10;
                const explorerMax = circleConfig.explorer.radius - 10;
                radius = explorerMin + Math.random() * (explorerMax - explorerMin);
                break;
                
            case 'edge_of_practitioner':
                // Position on the boundary between practitioner and explorer
                levelEmployees = employees.filter(e => e.engagement_level === 'edge_of_practitioner');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                radius = circleConfig.practitioner.radius;
                break;
                
            case 'practitioner':
                // Position within the practitioner ring (center)
                levelEmployees = employees.filter(e => e.engagement_level === 'practitioner');
                employeeIndex = levelEmployees.findIndex(e => e.employee_id === employee.employee_id);
                angleStep = (2 * Math.PI) / levelEmployees.length;
                angle = employeeIndex * angleStep;
                const practitionerMin = 20; // Close to center
                const practitionerMax = circleConfig.practitioner.radius - 10;
                radius = practitionerMin + Math.random() * (practitionerMax - practitionerMin);
                break;
                
                
            default:
                radius = this.outsiderRadius;
                angle = Math.random() * 2 * Math.PI;
        }
        
        const x = this.centerX + Math.cos(angle) * radius;
        const y = this.centerY + Math.sin(angle) * radius;
        
        return { x, y };
    }
    
    getEmployeeRadius() {
        if (this.showPhotos) {
            return 24; // Large size for photos
        } else {
            return 6; // Small dots
        }
    }
    
    getEmployeeColor(employee) {
        const levelColors = {
            'outsider': '#9CA3AF',                    // Gray
            'edge_of_newcomer': '#9CA3AF',           // Gray (they're on the edge, not quite in)
            'newcomer': '#3B82F6',                   // Blue
            'edge_of_explorer': '#3B82F6',           // Blue (color of ring they're outside of)
            'explorer': '#6366F1',                   // Blueish purple
            'edge_of_practitioner': '#6366F1',       // Blueish purple (color of ring they're outside of)
            'practitioner': '#8B5CF6'                // Purple
        };
        
        return levelColors[employee.engagement_level] || '#9CA3AF';
    }
    
    getInitials(name) {
        return name.split(' ').map(n => n[0]).join('');
    }
    
    showTooltip(event, employee) {
        const lastUsage = employee.last_ai_usage ? 
            new Date(employee.last_ai_usage).toLocaleDateString() : 'Never';
        
        this.tooltip
            .style("opacity", 1)
            .html(`
                <strong>${employee.name}</strong><br/>
                ${employee.title}<br/>
                AI Level: ${employee.engagement_level.replace(/_/g, ' ')}<br/>
                Last AI Usage: ${lastUsage}<br/>
                AI Tools: ${employee.ai_tools_used.length > 0 ? employee.ai_tools_used.join(', ') : 'None'}
            `)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
    }
    
    hideTooltip() {
        this.tooltip.style("opacity", 0);
    }
    
    showEmployeeInfo(employee) {
        const infoPanel = d3.select("#employee-info");
        const lastUsage = employee.last_ai_usage ? 
            new Date(employee.last_ai_usage).toLocaleDateString() : 'Never';
        const certificationStatus = this.getCertificationStatus(employee);
        
        infoPanel.html(`
            <h3>${employee.name}</h3>
            <p><strong>ID:</strong> ${employee.employee_id}</p>
            <p><strong>Email:</strong> ${employee.email}</p>
            <p><strong>Title:</strong> ${employee.title}</p>
            <p><strong>Organization:</strong> ${employee.org_level_1} > ${employee.org_level_2}</p>
            <p><strong>Location:</strong> ${employee.city}, ${employee.state}, ${employee.country}</p>
            <hr>
            <p><strong>AI Engagement Level:</strong> ${employee.engagement_level.replace(/_/g, ' ').toUpperCase()}</p>
            <p><strong>Last AI Usage:</strong> ${lastUsage}</p>
            <p><strong>Weeks Used (Past 4):</strong> ${employee.weeks_used_in_past_4}/4</p>
            <p><strong>Consecutive Weeks:</strong> ${employee.consecutive_weeks_used}</p>
            <p><strong>AI Tools Used:</strong> ${employee.ai_tools_used.length > 0 ? employee.ai_tools_used.join(', ') : 'None'}</p>
            <p><strong>Certification:</strong> ${certificationStatus}</p>
            <p><strong>Tenure:</strong> ${employee.tenure} years</p>
        `);
    }

    getCertificationStatus(employee) {
        if (employee.is_practitioner_certified) return 'Practitioner Certified';
        if (employee.is_in_practitioner_program) return 'In Practitioner Program';
        return 'None';
    }
}

// Initialize the visualization when the page loads
document.addEventListener('DOMContentLoaded', function() {
    new CommunityVisualization('#circles-svg');
});