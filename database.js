// Employee Database with organizational hierarchy and location data
class EmployeeDatabase {
    constructor() {
        this.employees = this.generateEmployees();
    }

    generateEmployees() {
        const titles = [
            'CEO', 'CTO', 'VP Engineering', 'VP Product', 'VP Sales', 'VP Marketing', 'VP Operations',
            'Director of Engineering', 'Director of Product', 'Director of Data', 'Director of Design',
            'Engineering Manager', 'Product Manager', 'Senior Product Manager', 'Data Science Manager',
            'Principal Engineer', 'Staff Engineer', 'Senior Software Engineer', 'Software Engineer',
            'Junior Software Engineer', 'Frontend Engineer', 'Backend Engineer', 'Full Stack Engineer',
            'DevOps Engineer', 'Site Reliability Engineer', 'Data Scientist', 'Senior Data Scientist',
            'Data Analyst', 'UX Designer', 'UI Designer', 'Product Designer', 'UX Researcher',
            'Technical Writer', 'QA Engineer', 'Test Engineer', 'Security Engineer',
            'Sales Manager', 'Account Executive', 'Sales Development Rep', 'Customer Success Manager',
            'Marketing Manager', 'Content Marketing Manager', 'Growth Marketing Manager',
            'HR Manager', 'Recruiter', 'People Operations Specialist', 'Finance Manager',
            'Business Analyst', 'Operations Manager', 'Support Engineer', 'Customer Support Specialist'
        ];

        const orgLevel1Options = ['Technology', 'Product', 'Sales', 'Marketing', 'Operations', 'Finance', 'HR'];
        const orgLevel2Map = {
            'Technology': ['Engineering', 'Data Science', 'DevOps', 'Security', 'QA'],
            'Product': ['Product Management', 'Design', 'Research', 'Analytics'],
            'Sales': ['Enterprise Sales', 'Mid-Market Sales', 'Customer Success', 'Sales Development'],
            'Marketing': ['Growth Marketing', 'Content Marketing', 'Brand Marketing', 'Product Marketing'],
            'Operations': ['Business Operations', 'People Operations', 'IT Operations', 'Legal'],
            'Finance': ['Financial Planning', 'Accounting', 'Revenue Operations', 'Corporate Development'],
            'HR': ['Talent Acquisition', 'People Development', 'Compensation', 'HR Operations']
        };

        const cities = [
            { city: 'San Francisco', state: 'CA', country: 'USA' },
            { city: 'New York', state: 'NY', country: 'USA' },
            { city: 'Austin', state: 'TX', country: 'USA' },
            { city: 'Seattle', state: 'WA', country: 'USA' },
            { city: 'Boston', state: 'MA', country: 'USA' },
            { city: 'Chicago', state: 'IL', country: 'USA' },
            { city: 'Los Angeles', state: 'CA', country: 'USA' },
            { city: 'Denver', state: 'CO', country: 'USA' },
            { city: 'London', state: 'England', country: 'UK' },
            { city: 'Berlin', state: 'Berlin', country: 'Germany' },
            { city: 'Toronto', state: 'ON', country: 'Canada' },
            { city: 'Dublin', state: 'Dublin', country: 'Ireland' },
            { city: 'Sydney', state: 'NSW', country: 'Australia' },
            { city: 'Singapore', state: 'Singapore', country: 'Singapore' },
            { city: 'Tel Aviv', state: 'Tel Aviv', country: 'Israel' }
        ];

        const firstNames = [
            'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn', 'Sage', 'River',
            'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Christopher', 'Ashley', 'Matthew', 'Amanda', 'Joshua',
            'Jennifer', 'Andrew', 'Elizabeth', 'Daniel', 'Stephanie', 'James', 'Nicole', 'Ryan', 'Michelle', 'John',
            'Lisa', 'Brandon', 'Kimberly', 'Jason', 'Amy', 'Justin', 'Angela', 'William', 'Heather', 'Jonathan',
            'Priya', 'Raj', 'Anisha', 'Vikram', 'Sophia', 'Liam', 'Emma', 'Noah', 'Olivia', 'William',
            'Chen', 'Li', 'Wang', 'Zhang', 'Liu', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou',
            'Mohammed', 'Ahmed', 'Fatima', 'Omar', 'Aisha', 'Hassan', 'Zahra', 'Ali', 'Amina', 'Yusuf',
            'Maria', 'Carlos', 'Ana', 'Luis', 'Carmen', 'Jose', 'Isabel', 'Miguel', 'Elena', 'Diego'
        ];

        const lastNames = [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
            'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
            'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
            'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
            'Patel', 'Singh', 'Kumar', 'Sharma', 'Gupta', 'Verma', 'Shah', 'Joshi', 'Reddy', 'Agarwal',
            'Chen', 'Wang', 'Li', 'Zhang', 'Liu', 'Yang', 'Wu', 'Huang', 'Zhou', 'Lin',
            'Al-Ahmed', 'Al-Hassan', 'Al-Rahman', 'Al-Zahra', 'Bin-Rashid', 'Bin-Omar', 'El-Mansouri', 'Farouk'
        ];

        const employees = [];
        
        for (let i = 1; i <= 100; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const title = titles[Math.floor(Math.random() * titles.length)];
            const orgLevel1 = orgLevel1Options[Math.floor(Math.random() * orgLevel1Options.length)];
            const orgLevel2 = orgLevel2Map[orgLevel1][Math.floor(Math.random() * orgLevel2Map[orgLevel1].length)];
            const location = cities[Math.floor(Math.random() * cities.length)];
            
            // Generate org levels 3-5 based on hierarchy
            const orgLevel3 = this.generateOrgLevel3(orgLevel2);
            const orgLevel4 = this.generateOrgLevel4(orgLevel3);
            const orgLevel5 = this.generateOrgLevel5(title);

            const aiUsageData = this.generateAIUsageData();
            const aiEngagementLevel = this.calculateAIEngagementLevel(aiUsageData);

            employees.push({
                employee_id: i,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
                title: title,
                org_level_1: orgLevel1,
                org_level_2: orgLevel2,
                org_level_3: orgLevel3,
                org_level_4: orgLevel4,
                org_level_5: orgLevel5,
                city: location.city,
                state: location.state,
                country: location.country,
                // Additional fields for visualization
                name: `${firstName} ${lastName}`,
                tenure: Math.round((Math.random() * 8 + 0.1) * 10) / 10, // 0.1 to 8.1 years
                engagement_level: aiEngagementLevel,
                // AI usage tracking fields
                ...aiUsageData
            });
        }

        return employees;
    }

    generateOrgLevel3(orgLevel2) {
        const teamOptions = {
            'Engineering': ['Platform Team', 'Frontend Team', 'Backend Team', 'Mobile Team', 'Infrastructure Team'],
            'Data Science': ['Analytics Team', 'ML Engineering Team', 'Data Platform Team', 'Research Team'],
            'DevOps': ['Cloud Infrastructure', 'CI/CD Team', 'Security Operations', 'Site Reliability'],
            'Security': ['Application Security', 'Infrastructure Security', 'Compliance Team', 'Risk Management'],
            'QA': ['Automation Team', 'Manual Testing', 'Performance Testing', 'Security Testing'],
            'Product Management': ['Core Product', 'Growth Product', 'Platform Product', 'Enterprise Product'],
            'Design': ['Product Design', 'Brand Design', 'User Research', 'Design Systems'],
            'Research': ['User Research', 'Market Research', 'Product Research', 'UX Research'],
            'Analytics': ['Product Analytics', 'Business Analytics', 'Data Visualization', 'Reporting'],
            'Enterprise Sales': ['Large Enterprise', 'Mid Enterprise', 'Strategic Accounts', 'Channel Partners'],
            'Mid-Market Sales': ['SMB Sales', 'Growth Sales', 'Regional Sales', 'Inside Sales'],
            'Customer Success': ['Onboarding', 'Account Management', 'Customer Support', 'Success Operations'],
            'Sales Development': ['Inbound SDR', 'Outbound SDR', 'Sales Ops', 'Lead Generation']
        };
        
        const options = teamOptions[orgLevel2] || ['Team A', 'Team B', 'Team C'];
        return options[Math.floor(Math.random() * options.length)];
    }

    generateOrgLevel4(orgLevel3) {
        const subTeams = ['Alpha Squad', 'Beta Squad', 'Gamma Squad', 'Delta Squad', 'Core Group', 'Special Projects'];
        return subTeams[Math.floor(Math.random() * subTeams.length)];
    }

    generateOrgLevel5(title) {
        if (title.includes('Senior') || title.includes('Staff') || title.includes('Principal')) {
            return 'Senior IC';
        } else if (title.includes('Manager') || title.includes('Director') || title.includes('VP')) {
            return 'Leadership';
        } else if (title.includes('Junior') || title.includes('Intern')) {
            return 'Junior IC';
        } else {
            return 'Mid-level IC';
        }
    }

    determineAIEngagementLevel() {
        const levels = [
            'outsider',
            'edge_of_newcomer', 
            'newcomer',
            'edge_of_explorer',
            'explorer',
            'edge_of_practitioner',
            'practitioner',
            'edge_of_pro',
            'pro'
        ];
        
        // Weighted distribution - more people in middle levels
        const weights = [0.05, 0.10, 0.20, 0.15, 0.25, 0.10, 0.08, 0.05, 0.02];
        const random = Math.random();
        let cumulative = 0;
        
        for (let i = 0; i < levels.length; i++) {
            cumulative += weights[i];
            if (random <= cumulative) {
                return levels[i];
            }
        }
        return 'explorer'; // fallback
    }

    generateAIUsageData() {
        const today = new Date();
        const fourWeeksAgo = new Date(today.getTime() - (4 * 7 * 24 * 60 * 60 * 1000));
        const twelveWeeksAgo = new Date(today.getTime() - (12 * 7 * 24 * 60 * 60 * 1000));
        
        return {
            last_ai_usage: this.generateLastUsageDate(fourWeeksAgo, twelveWeeksAgo),
            weeks_used_in_past_4: Math.floor(Math.random() * 5), // 0-4 weeks
            consecutive_weeks_used: Math.floor(Math.random() * 8), // 0-7 weeks
            is_in_practitioner_program: Math.random() < 0.15,
            is_practitioner_certified: Math.random() < 0.10,
            is_in_pro_program: Math.random() < 0.08,
            is_pro_certified: Math.random() < 0.03,
            ai_tools_used: this.generateAIToolsList()
        };
    }

    generateLastUsageDate(fourWeeksAgo, twelveWeeksAgo) {
        const random = Math.random();
        if (random < 0.6) {
            // Used recently (within 4 weeks)
            const daysAgo = Math.floor(Math.random() * 28);
            return new Date(Date.now() - (daysAgo * 24 * 60 * 60 * 1000));
        } else if (random < 0.8) {
            // Used 4-12 weeks ago
            const start = fourWeeksAgo.getTime();
            const end = twelveWeeksAgo.getTime();
            return new Date(start + Math.random() * (end - start));
        } else {
            // Never used or very long ago
            return null;
        }
    }

    generateAIToolsList() {
        const tools = ['ChatGPT', 'Claude', 'GitHub Copilot', 'Midjourney', 'Stable Diffusion', 'Notion AI', 'Grammarly', 'Jasper'];
        const numTools = Math.floor(Math.random() * 4); // 0-3 tools
        const selectedTools = [];
        
        for (let i = 0; i < numTools; i++) {
            const tool = tools[Math.floor(Math.random() * tools.length)];
            if (!selectedTools.includes(tool)) {
                selectedTools.push(tool);
            }
        }
        
        return selectedTools;
    }

    calculateAIEngagementLevel(aiUsageData) {
        const today = new Date();
        const fourWeeksAgo = new Date(today.getTime() - (4 * 7 * 24 * 60 * 60 * 1000));
        
        // Check certification status first (highest priority)
        if (aiUsageData.is_pro_certified) return 'pro';
        if (aiUsageData.is_in_pro_program) return 'edge_of_pro';
        if (aiUsageData.is_practitioner_certified) return 'practitioner';
        if (aiUsageData.is_in_practitioner_program) return 'edge_of_practitioner';
        
        // Check usage patterns
        const hasRecentUsage = aiUsageData.last_ai_usage && aiUsageData.last_ai_usage > fourWeeksAgo;
        const hasEverUsed = aiUsageData.last_ai_usage !== null;
        
        if (!hasEverUsed) return 'outsider';
        
        if (hasRecentUsage) {
            if (aiUsageData.weeks_used_in_past_4 >= 3) {
                return 'explorer';
            } else {
                return 'newcomer';
            }
        } else {
            // Used before but not recently
            if (aiUsageData.consecutive_weeks_used >= 3) {
                return 'edge_of_explorer';
            } else {
                return 'edge_of_newcomer';
            }
        }
    }

    // Database query methods
    getAllEmployees() {
        return this.employees;
    }

    getEmployeeById(id) {
        return this.employees.find(emp => emp.employee_id === id);
    }

    getEmployeesByOrgLevel(level, value) {
        const field = `org_level_${level}`;
        return this.employees.filter(emp => emp[field] === value);
    }

    getEmployeesByLocation(city, state = null, country = null) {
        return this.employees.filter(emp => {
            let matches = emp.city === city;
            if (state) matches = matches && emp.state === state;
            if (country) matches = matches && emp.country === country;
            return matches;
        });
    }

    getEmployeesByEngagementLevel(level) {
        return this.employees.filter(emp => emp.engagement_level === level);
    }

    searchEmployees(query) {
        const lowerQuery = query.toLowerCase();
        return this.employees.filter(emp => 
            emp.name.toLowerCase().includes(lowerQuery) ||
            emp.email.toLowerCase().includes(lowerQuery) ||
            emp.title.toLowerCase().includes(lowerQuery) ||
            emp.org_level_1.toLowerCase().includes(lowerQuery) ||
            emp.org_level_2.toLowerCase().includes(lowerQuery)
        );
    }

    getOrgHierarchy() {
        const hierarchy = {};
        this.employees.forEach(emp => {
            if (!hierarchy[emp.org_level_1]) {
                hierarchy[emp.org_level_1] = {};
            }
            if (!hierarchy[emp.org_level_1][emp.org_level_2]) {
                hierarchy[emp.org_level_1][emp.org_level_2] = {};
            }
            if (!hierarchy[emp.org_level_1][emp.org_level_2][emp.org_level_3]) {
                hierarchy[emp.org_level_1][emp.org_level_2][emp.org_level_3] = [];
            }
            hierarchy[emp.org_level_1][emp.org_level_2][emp.org_level_3].push(emp);
        });
        return hierarchy;
    }

    exportToCSV() {
        const headers = ['employee_id', 'email', 'title', 'org_level_1', 'org_level_2', 'org_level_3', 'org_level_4', 'org_level_5', 'city', 'state', 'country'];
        const csvContent = [
            headers.join(','),
            ...this.employees.map(emp => 
                headers.map(header => `"${emp[header]}"`).join(',')
            )
        ].join('\n');
        
        return csvContent;
    }
}