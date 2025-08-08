# FORGE Platform - User Roles & Privileges Knowledge Base

## 📋 Table of Contents
1. [Overview](#overview)
2. [User Roles](#user-roles)
3. [Subscription Tiers](#subscription-tiers)
4. [Access Control Matrix](#access-control-matrix)
5. [Feature Comparison](#feature-comparison)
6. [Admin Management](#admin-management)
7. [Security & Permissions](#security--permissions)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

FORGE implements a **Role-Based Access Control (RBAC)** system with two primary user roles and five subscription tiers. This ensures proper security, feature access, and user management across the platform.

### Key Concepts:
- **User Roles**: Define core permissions and capabilities
- **Subscription Tiers**: Determine feature access and limits
- **Admin Privileges**: Special management capabilities
- **Plan Management**: Dynamic subscription control

---

## 👥 User Roles

### 1. **USER Role** (Regular Users)
**Default role for all registered users**

#### Capabilities:
- ✅ Create and manage personal profile
- ✅ Browse projects and teams
- ✅ Apply to projects and teams
- ✅ Send and receive messages
- ✅ View analytics dashboard
- ✅ Access user settings
- ✅ Create projects and teams
- ✅ Manage personal applications

#### Limitations:
- ❌ Cannot access admin panel
- ❌ Cannot manage other users
- ❌ Cannot switch between user profiles
- ❌ Limited to assigned subscription tier features

#### Profile Switching:
- ❌ **Cannot** switch to admin profile
- ❌ **Cannot** access admin features
- ❌ **Cannot** elevate other users

---

### 2. **ADMIN Role** (Administrators)
**Special role with full platform management capabilities**

#### Capabilities:
- ✅ **All USER capabilities** plus:
- ✅ Access admin dashboard (`/admin`)
- ✅ View platform statistics and analytics
- ✅ Manage user subscription plans
- ✅ Switch between user profiles for testing
- ✅ Access admin-only navigation
- ✅ View all users and their details
- ✅ Change user subscription tiers
- ✅ Monitor platform usage

#### Admin-Specific Features:
- 🔧 **User Management**: `/admin/manage-users`
- 📊 **Platform Analytics**: `/admin`
- 👤 **Profile Switching**: Test different user experiences
- 🎛️ **Plan Elevation**: Change user subscription tiers

#### Security:
- 🔒 **Single Admin**: Only one admin user (`ranjeeth_ap@outlook.com`)
- 🔒 **Role Protection**: Cannot be changed by regular users
- 🔒 **Audit Trail**: All admin actions are logged

---

## 💳 Subscription Tiers

### 1. **FREE Tier** (Default)
**Basic access for new users**

#### Features:
- ✅ Basic profile creation
- ✅ Browse projects and teams
- ✅ Apply to 3 projects/month
- ✅ Basic messaging (10 messages/month)
- ✅ View public analytics
- ✅ Basic team creation (1 team)

#### Limits:
- 📊 Limited analytics access
- 💬 Restricted messaging
- 👥 Single team membership
- 📝 Basic project applications

---

### 2. **INDIVIDUAL Tier** ($9/month)
**Enhanced features for individual professionals**

#### Features:
- ✅ All FREE features plus:
- ✅ Apply to 10 projects/month
- ✅ Enhanced messaging (50 messages/month)
- ✅ Advanced analytics dashboard
- ✅ Create up to 3 teams
- ✅ Priority application processing
- ✅ Basic project templates

#### Limits:
- 👥 Maximum 3 teams
- 📊 Standard analytics
- 💬 50 messages/month

---

### 3. **STARTUP Tier** ($29/month)
**Team-focused features for small organizations**

#### Features:
- ✅ All INDIVIDUAL features plus:
- ✅ Apply to unlimited projects
- ✅ Unlimited messaging
- ✅ Advanced team management
- ✅ Create up to 10 teams
- ✅ Team analytics and reporting
- ✅ Project templates library
- ✅ Priority support

#### Limits:
- 👥 Maximum 10 teams
- 📊 Advanced analytics
- 🎯 Team-based features

---

### 4. **BUSINESS Tier** ($99/month)
**Enterprise-grade features for growing companies**

#### Features:
- ✅ All STARTUP features plus:
- ✅ Unlimited teams
- ✅ Advanced project management
- ✅ Custom project templates
- ✅ Advanced analytics and reporting
- ✅ API access
- ✅ White-label options
- ✅ Dedicated support

#### Limits:
- 📊 Premium analytics
- 🔧 Advanced integrations
- 🎨 Custom branding options

---

### 5. **ENTERPRISE Tier** (Contact Sales)
**Full platform access with custom features**

#### Features:
- ✅ All BUSINESS features plus:
- ✅ Custom integrations
- ✅ Advanced security features
- ✅ Custom analytics
- ✅ Dedicated account manager
- ✅ SLA guarantees
- ✅ Custom development
- ✅ On-premise options

#### Special Access:
- 🔧 **Admin Access**: Can be granted admin privileges
- 🎛️ **Custom Features**: Tailored to specific needs
- 📞 **24/7 Support**: Premium support services

---

## 🔐 Access Control Matrix

| Feature | FREE | INDIVIDUAL | STARTUP | BUSINESS | ENTERPRISE | ADMIN |
|---------|------|------------|---------|----------|------------|-------|
| **Profile Management** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Browse Projects** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Browse Teams** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Apply to Projects** | 3/month | 10/month | Unlimited | Unlimited | Unlimited | ✅ |
| **Messaging** | 10/month | 50/month | Unlimited | Unlimited | Unlimited | ✅ |
| **Create Teams** | 1 | 3 | 10 | Unlimited | Unlimited | ✅ |
| **Analytics Dashboard** | Basic | Enhanced | Advanced | Premium | Custom | ✅ |
| **Admin Panel** | ❌ | ❌ | ❌ | ❌ | ⚠️* | ✅ |
| **User Management** | ❌ | ❌ | ❌ | ❌ | ⚠️* | ✅ |
| **Plan Elevation** | ❌ | ❌ | ❌ | ❌ | ⚠️* | ✅ |

*⚠️ Can be granted admin privileges by existing admin*

---

## 🆚 Feature Comparison

### **Core Features**
| Feature | FREE | INDIVIDUAL | STARTUP | BUSINESS | ENTERPRISE |
|---------|------|------------|---------|----------|------------|
| **Monthly Cost** | $0 | $9 | $29 | $99 | Custom |
| **Project Applications** | 3 | 10 | Unlimited | Unlimited | Unlimited |
| **Team Creation** | 1 | 3 | 10 | Unlimited | Unlimited |
| **Messaging** | 10 | 50 | Unlimited | Unlimited | Unlimited |
| **Analytics** | Basic | Enhanced | Advanced | Premium | Custom |
| **Support** | Community | Email | Priority | Dedicated | 24/7 |

### **Advanced Features**
| Feature | FREE | INDIVIDUAL | STARTUP | BUSINESS | ENTERPRISE |
|---------|------|------------|---------|----------|------------|
| **API Access** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Custom Templates** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **White Label** | ❌ | ❌ | ❌ | ✅ | ✅ |
| **Custom Integrations** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **On-Premise** | ❌ | ❌ | ❌ | ❌ | ✅ |

---

## 🛠️ Admin Management

### **Admin Access**
- **Email**: `ranjeeth_ap@outlook.com`
- **Password**: Any password (mock authentication)
- **Role**: ADMIN
- **Tier**: ENTERPRISE (automatic)

### **Admin Capabilities**

#### 1. **User Management**
```bash
# Access user management
URL: /admin/manage-users
Features:
- View all users
- Change user subscription tiers
- Monitor user activity
- Manage user plans
```

#### 2. **Platform Analytics**
```bash
# Access admin dashboard
URL: /admin
Features:
- Platform statistics
- User growth metrics
- Revenue analytics
- System health monitoring
```

#### 3. **Profile Switching**
```bash
# Test different user experiences
Admin can switch between:
- Ranjeeth (Admin) - Full admin access
- Demo (User) - Regular user experience
```

### **Admin Security**
- 🔒 **Single Admin**: Only one admin user allowed
- 🔒 **Role Protection**: Admin role cannot be changed
- 🔒 **Audit Logging**: All admin actions are tracked
- 🔒 **Access Control**: Admin features are role-protected

---

## 🔒 Security & Permissions

### **Authentication**
- **Mock Authentication**: Currently using localStorage-based auth
- **Email-Based**: User identification via email address
- **Role-Based**: Access control based on user role
- **Session Management**: Automatic session handling

### **Authorization**
- **Route Protection**: Admin routes require ADMIN role
- **Feature Gates**: Subscription-based feature access
- **API Security**: Role-based API endpoint protection
- **Data Isolation**: Users can only access their own data

### **Data Protection**
- **User Data**: Protected by role-based access
- **Admin Data**: Restricted to admin users only
- **Plan Data**: Subscription tier information
- **Audit Trail**: Admin actions are logged

---

## 🔧 Troubleshooting

### **Common Issues**

#### 1. **Cannot Access Admin Panel**
**Problem**: User cannot access `/admin` or admin features
**Solution**: 
- Ensure you're logged in as `ranjeeth_ap@outlook.com`
- Check that user role is set to 'ADMIN'
- Clear browser cache and localStorage
- Try logging out and back in

#### 2. **Plan Selection Not Working**
**Problem**: Plan selection during registration not functioning
**Solution**:
- Check browser console for errors
- Ensure form validation is passing
- Verify localStorage is working
- Check API endpoint responses

#### 3. **User Switching Not Available**
**Problem**: Cannot switch between user profiles
**Solution**:
- Only admin users can switch profiles
- Ensure you're logged in as admin
- Check dropdown menu in dashboard
- Verify admin role assignment

#### 4. **Feature Access Denied**
**Problem**: Cannot access certain features
**Solution**:
- Check current subscription tier
- Verify feature is included in current plan
- Contact admin for plan elevation
- Check role-based permissions

### **Debug Commands**

#### Check User Role
```javascript
// In browser console
console.log(localStorage.getItem('userEmail'));
// Should return: 'ranjeeth_ap@outlook.com' for admin
```

#### Check Subscription Tier
```javascript
// In browser console
console.log(localStorage.getItem('userPlan'));
// Should return current plan (FREE, INDIVIDUAL, etc.)
```

#### Test Admin Access
```bash
# Test admin API endpoint
curl -X GET http://localhost:3000/api/admin/stats
# Should return 200 for admin users
```

---

## 📞 Support

### **Getting Help**
- **Community Support**: Available for all users
- **Email Support**: INDIVIDUAL tier and above
- **Priority Support**: STARTUP tier and above
- **Dedicated Support**: BUSINESS tier and above
- **24/7 Support**: ENTERPRISE tier only

### **Admin Support**
- **Admin Email**: `ranjeeth_ap@outlook.com`
- **Admin Dashboard**: `/admin`
- **User Management**: `/admin/manage-users`
- **Documentation**: This KB document

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-08 | Initial KB creation |
| 1.1 | 2025-01-08 | Added troubleshooting section |
| 1.2 | 2025-01-08 | Enhanced security documentation |

---

**Last Updated**: January 8, 2025  
**Document Version**: 1.2  
**Maintained By**: FORGE Development Team
