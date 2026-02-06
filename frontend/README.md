# CAMPUS UTILITY MANAGEMENT SYSTEM

## A Full Stack Web Application

### Project Report

---

![Project Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=Campus+Utility+Management+System)

---

## 📋 TABLE OF CONTENTS

1. [Title Page](#1-title-page)
2. [Certificate](#2-certificate)
3. [Acknowledgement](#3-acknowledgement)
4. [Abstract](#4-abstract)
5. [Chapter 1: Introduction](#5-chapter-1-introduction)
   - [1.1 Project Overview](#11-project-overview)
   - [1.2 Problem Statement](#12-problem-statement)
   - [1.3 Objectives](#13-objectives)
   - [1.4 Scope of Project](#14-scope-of-project)
   - [1.5 Significance of Project](#15-significance-of-project)
6. [Chapter 2: Literature Review](#6-chapter-2-literature-review)
   - [2.1 Existing Systems](#21-existing-systems)
   - [2.2 Limitations of Existing Systems](#22-limitations-of-existing-systems)
   - [2.3 Proposed Solution](#23-proposed-solution)
7. [Chapter 3: System Requirements](#7-chapter-3-system-requirements)
   - [3.1 Functional Requirements](#31-functional-requirements)
   - [3.2 Non-Functional Requirements](#32-non-functional-requirements)
   - [3.3 Hardware Requirements](#33-hardware-requirements)
   - [3.4 Software Requirements](#34-software-requirements)
8. [Chapter 4: System Design](#8-chapter-4-system-design)
   - [4.1 System Architecture](#41-system-architecture)
   - [4.2 Data Flow Diagrams](#42-data-flow-diagrams)
   - [4.3 ER Diagram](#43-er-diagram)
   - [4.4 Database Schema](#44-database-schema)
   - [4.5 Use Case Diagrams](#45-use-case-diagrams)
9. [Chapter 5: Implementation](#9-chapter-5-implementation)
   - [5.1 Technology Stack](#51-technology-stack)
   - [5.2 Module Description](#52-module-description)
   - [5.3 Code Implementation](#53-code-implementation)
   - [5.4 API Endpoints](#54-api-endpoints)
10. [Chapter 6: Testing](#10-chapter-6-testing)
    - [6.1 Testing Methodology](#61-testing-methodology)
    - [6.2 Test Cases](#62-test-cases)
    - [6.3 Test Results](#63-test-results)
11. [Chapter 7: Screenshots](#11-chapter-7-screenshots)
12. [Chapter 8: Conclusion & Future Scope](#12-chapter-8-conclusion--future-scope)
    - [8.1 Conclusion](#81-conclusion)
    - [8.2 Future Enhancements](#82-future-enhancements)
13. [References](#13-references)
14. [Appendix](#14-appendix)

---

## 1. TITLE PAGE

<div align="center">

# PROJECT REPORT

## ON

# CAMPUS UTILITY MANAGEMENT SYSTEM

### A Full Stack Web Application

---

**Submitted By:**

**[Student Name]**

**Roll No: [XXXXXXXX]**

---

**Under Guidance of:**

**[Faculty Name]**

---

**Department of Computer Science**

**[College/University Name]**

**[City, State]**

---

**Academic Year: 2024-25**

</div>

---

## 2. CERTIFICATE

<div align="center">

# CERTIFICATE

</div>

This is to certify that the project entitled **"CAMPUS UTILITY MANAGEMENT SYSTEM"** submitted by **[Student Name]**, Roll No. **[XXXXXXXX]**, is a bonafide work carried out by him/her in partial fulfillment of the requirement for the award of the degree of **Bachelor of Technology in Computer Science & Engineering** during the academic year **2024-25**.

<br><br>

| Project Guide | Head of Department |
|:-------------:|:------------------:|
| [Faculty Name] | [HOD Name] |

<br>

**Date:** _______________

**Place:** ______________

---

## 3. ACKNOWLEDGEMENT

I would like to express my sincere gratitude to all those who have contributed to the successful completion of this project.

First and foremost, I would like to thank my project guide, **[Faculty Name]**, for their invaluable guidance, continuous support, and encouragement throughout the development of this project. Their expertise and insights have been instrumental in shaping this work.

I am also grateful to **[HOD Name]**, Head of the Department of Computer Science, for providing the necessary facilities and resources required for this project.

I extend my thanks to all the faculty members of the department who have directly or indirectly helped me in completing this project successfully.

I would also like to thank my family and friends for their constant support and motivation during this endeavor.

Finally, I thank everyone who has contributed to this project in any way.

<div align="right">

**[Student Name]**

**[Roll Number]**

**[Date]**

</div>

---

## 4. ABSTRACT

### CAMPUS UTILITY MANAGEMENT SYSTEM

The **Campus Utility Management System** is a comprehensive full-stack web application designed to streamline the process of reporting, tracking, and managing utility-related service requests within a campus environment. The system addresses the common challenges faced by students, staff, and administrators in handling maintenance issues such as plumbing problems, electrical faults, internet connectivity issues, and other facility-related concerns.

The application is built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js), providing a robust, scalable, and modern solution. The system features a role-based authentication mechanism that distinguishes between regular users (students/staff) and administrators, each having access to appropriate functionalities.

### Key Features:

- ✅ User Authentication (Login/Signup) with JWT-based security
- ✅ Service Request Submission with multiple categories
- ✅ Real-time Request Tracking and Status Updates
- ✅ Administrative Dashboard for request management
- ✅ Priority-based Request Handling
- ✅ Location-specific Request Logging
- ✅ Responsive User Interface

The system eliminates the need for paper-based complaint registration, reduces response time for utility issues, and provides transparency in the request resolution process. The implementation follows modern software development practices including RESTful API design, component-based frontend architecture, and secure database management.

**Keywords:** Full Stack Development, MERN Stack, Utility Management, Service Request System, Campus Management, Web Application

---

## 5. CHAPTER 1: INTRODUCTION

### 1.1 Project Overview

The Campus Utility Management System is a web-based application designed to facilitate efficient management of utility-related service requests in educational institutions. The system provides a digital platform where students and staff can submit, track, and manage requests for various utility services such as plumbing repairs, electrical maintenance, internet connectivity issues, and general facility management.

#### Project Summary

| Attribute | Details |
|-----------|---------|
| **Project Name** | Campus Utility Management System |
| **Project Type** | Full Stack Web Application |
| **Technology** | MERN Stack |
| **Development** | Agile Methodology |
| **Target Users** | Students, Staff, Administrators |

The application serves three primary user roles:

1. **Students** - Can submit and track their service requests
2. **Staff** - Can submit and manage facility-related requests
3. **Administrators** - Can manage all requests and assign technicians

---

### 1.2 Problem Statement

Educational institutions often face significant challenges in managing utility and maintenance requests:

#### Current Challenges

| Problem | Impact |
|---------|--------|
| Paper-based complaint system | Slow processing, lost records |
| No tracking mechanism | Users unaware of request status |
| Delayed response time | User dissatisfaction |
| Poor communication | No updates on resolution progress |
| Lack of prioritization | Critical issues not addressed promptly |
| No historical data | Cannot analyze recurring issues |
| Manual workload | Administrative burden on staff |

#### Consequences

- 😞 Frustration among students and staff
- 📉 Inefficient resource allocation
- ⏰ Delayed resolution of critical issues
- ❌ No accountability in the process
- 📊 Difficulty in measuring performance metrics

---

### 1.3 Objectives

#### Primary Objectives

1. **Digitize the Request Process**
   - Eliminate paper-based complaint registration
   - Provide online request submission platform

2. **Enable Request Tracking**
   - Allow users to track request status in real-time
   - Provide status updates and notifications

3. **Streamline Administration**
   - Centralized dashboard for administrators
   - Easy assignment and status updates

4. **Improve Response Time**
   - Priority-based request handling
   - Quick identification of urgent issues

#### Secondary Objectives

- ✅ Implement secure user authentication
- ✅ Create responsive and user-friendly interface
- ✅ Generate request statistics and reports
- ✅ Enable category-based request classification
- ✅ Provide location-specific request logging

---

### 1.4 Scope of Project

#### In Scope

| Feature | Description |
|---------|-------------|
| ✅ User Authentication | Registration and login functionality |
| ✅ Service Request Submission | Multi-category request creation |
| ✅ Request Tracking | Real-time status updates |
| ✅ Administrative Dashboard | Request management interface |
| ✅ Category Management | Multiple service categories |
| ✅ Priority Management | Priority-based handling |
| ✅ Location Logging | Building and room tracking |
| ✅ User Profile | Profile management |
| ✅ Statistics | Request history and stats |

#### Out of Scope

| Feature | Reason |
|---------|--------|
| ❌ Mobile Application | Time constraints |
| ❌ SMS/Email Notifications | External service integration |
| ❌ Payment Gateway | Not required for MVP |
| ❌ Inventory Management | Complex feature |
| ❌ Technician Mobile App | Separate project |
| ❌ Advanced Analytics | Future enhancement |
| ❌ ERP Integration | Requires institutional access |

---

### 1.5 Significance of Project

#### Benefits to Stakeholders

##### For Students/Staff:
- 📱 Convenient online request submission
- 🔍 Real-time tracking of request status
- 📊 Transparency in the resolution process
- 📜 Access to request history

##### For Administrators:
- 🎯 Centralized request management
- ⚖️ Efficient workload distribution
- 📈 Performance monitoring capabilities
- 📊 Data-driven decision making

##### For Institution:
- ⚡ Improved operational efficiency
- 💰 Reduced administrative overhead
- 🔧 Better resource utilization
- 😊 Enhanced user satisfaction

---

## 6. CHAPTER 2: LITERATURE REVIEW

### 2.1 Existing Systems

#### 2.1.1 Traditional Paper-Based Systems

Most educational institutions still rely on paper-based complaint registers where students physically visit the administrative office to lodge complaints.

**Characteristics:**
- Manual register entry
- Physical file management
- Verbal status inquiries
- No tracking mechanism

#### 2.1.2 Email-Based Systems

Some institutions use email for complaint registration:

- Complaints sent to designated email addresses
- Manual tracking by administrators
- Reply-based status updates
- Prone to missed emails

#### 2.1.3 Existing Digital Solutions

| System | Features | Limitations |
|--------|----------|-------------|
| ServiceNow | Enterprise-grade ITSM | Complex, expensive |
| Freshdesk | Ticket management | Not campus-specific |
| SchoolDude | Facility management | Limited customization |
| Maintenance Care | Work order management | Not education-focused |

---

### 2.2 Limitations of Existing Systems

#### 1. HIGH COST
- Enterprise solutions are expensive
- Require significant licensing fees

#### 2. COMPLEXITY
- Steep learning curve
- Over-featured for simple use cases

#### 3. LACK OF CUSTOMIZATION
- Cannot adapt to specific campus needs
- Fixed workflow structures

#### 4. INTEGRATION ISSUES
- Difficult to integrate with existing systems
- Require technical expertise

#### 5. NOT CAMPUS-SPECIFIC
- Generic solutions not designed for educational use
- Missing relevant categories and workflows

---

### 2.3 Proposed Solution

The Campus Utility Management System addresses these limitations by providing:

#### Key Differentiators

| Feature | Benefit |
|---------|---------|
| **Purpose-Built for Campus** | Categories specific to campus needs, building/room tracking, student ID integration |
| **Cost-Effective** | Open-source technologies, no licensing fees, easy deployment |
| **Simple and Intuitive** | User-friendly interface, minimal learning curve, responsive design |
| **Customizable** | Modular architecture, extensible features, configurable workflows |
| **Modern Technology** | MERN stack, RESTful API, secure authentication |

---

## 7. CHAPTER 3: SYSTEM REQUIREMENTS

### 3.1 Functional Requirements

#### 3.1.1 User Management Module

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-01 | User shall be able to register with email and password | High |
| FR-02 | User shall be able to login with credentials | High |
| FR-03 | User shall be able to update profile information | Medium |
| FR-04 | System shall support role-based access (Student/Staff/Admin) | High |
| FR-05 | User shall be able to logout securely | High |

#### 3.1.2 Service Request Module

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-06 | User shall be able to submit new service request | High |
| FR-07 | User shall be able to select category for request | High |
| FR-08 | User shall be able to set priority level | High |
| FR-09 | User shall be able to specify location details | High |
| FR-10 | User shall be able to view their submitted requests | High |
| FR-11 | User shall be able to track request status | High |
| FR-12 | User shall be able to view request details | Medium |
| FR-13 | User shall be able to delete pending requests | Low |

#### 3.1.3 Admin Module

| Req ID | Requirement | Priority |
|--------|-------------|----------|
| FR-14 | Admin shall be able to view all requests | High |
| FR-15 | Admin shall be able to update request status | High |
| FR-16 | Admin shall be able to assign technician | Medium |
| FR-17 | Admin shall be able to add remarks to requests | Medium |
| FR-18 | Admin shall be able to view dashboard statistics | Medium |
| FR-19 | Admin shall be able to filter requests by status/category | Medium |

---

### 3.2 Non-Functional Requirements

#### 3.2.1 Performance Requirements

| Requirement | Target |
|-------------|--------|
| Page load time | < 3 seconds |
| API response time | < 500ms |
| Concurrent users | 100+ simultaneous users |
| Database queries | < 100ms average |
| System uptime | 99% availability |

#### 3.2.2 Security Requirements

- 🔐 Secure password hashing using bcrypt
- 🎫 JWT-based authentication
- 🛡️ Protected API routes
- ✅ Input validation and sanitization
- 🌐 CORS configuration for security
- 👤 Role-based access control

#### 3.2.3 Usability Requirements

- Intuitive user interface
- Responsive design for all devices
- Clear navigation structure
- Meaningful error messages
- Consistent design patterns

#### 3.2.4 Reliability Requirements

- Graceful error handling
- Data validation at all levels
- Transaction management
- Backup and recovery procedures

---

### 3.3 Hardware Requirements

#### Development Environment

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| Processor | Intel Core i3 | Intel Core i5 or higher |
| RAM | 4 GB | 8 GB or higher |
| Storage | 20 GB free space | 50 GB SSD |
| Display | 1366 x 768 | 1920 x 1080 |
| Network | Broadband Internet | High-speed Internet |

#### Production Server

| Component | Specification |
|-----------|--------------|
| Processor | 2+ CPU cores |
| RAM | 4 GB minimum |
| Storage | 50 GB SSD |
| Network | 100 Mbps |
| OS | Ubuntu 20.04 LTS or Windows Server |

---

### 3.4 Software Requirements

#### Development Tools

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.x or higher | Runtime environment |
| npm | 9.x or higher | Package manager |
| MongoDB | 6.0 or higher | Database |
| VS Code | Latest | Code editor |
| Git | Latest | Version control |
| Postman | Latest | API testing |
| Chrome/Firefox | Latest | Browser testing |

#### Technology Stack