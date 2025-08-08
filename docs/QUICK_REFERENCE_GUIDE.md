# FORGE Platform - Quick Reference Guide

## 🚀 Quick Access

### **Admin Login**
- **Email**: `ranjeeth_ap@outlook.com`
- **Password**: Any password
- **Admin Panel**: `/admin`
- **User Management**: `/admin/manage-users`

---

## 👥 User Roles Summary

| Role | Description | Key Features |
|------|-------------|--------------|
| **USER** | Regular users | Profile, projects, teams, messaging |
| **ADMIN** | Platform administrator | All USER + admin panel, user management |

---

## 💳 Subscription Tiers

| Tier | Cost | Key Features | Limits |
|------|------|--------------|--------|
| **FREE** | $0 | Basic access | 3 projects/month, 10 messages |
| **INDIVIDUAL** | $9 | Enhanced features | 10 projects/month, 50 messages |
| **STARTUP** | $29 | Team features | Unlimited projects, 10 teams |
| **BUSINESS** | $99 | Enterprise features | Unlimited teams, API access |
| **ENTERPRISE** | Custom | Full platform | Custom features, admin access |

---

## 🔐 Access Matrix

| Feature | FREE | INDIVIDUAL | STARTUP | BUSINESS | ENTERPRISE | ADMIN |
|---------|------|------------|---------|----------|------------|-------|
| Browse Projects | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Apply to Projects | 3/mo | 10/mo | ∞ | ∞ | ∞ | ✅ |
| Create Teams | 1 | 3 | 10 | ∞ | ∞ | ✅ |
| Messaging | 10/mo | 50/mo | ∞ | ∞ | ∞ | ✅ |
| Analytics | Basic | Enhanced | Advanced | Premium | Custom | ✅ |
| Admin Panel | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ |

---

## 🛠️ Admin Commands

### **Access Admin Panel**
```bash
# Login as admin
Email: ranjeeth_ap@outlook.com
Password: any

# Navigate to admin panel
URL: http://localhost:3000/admin

# Manage users
URL: http://localhost:3000/admin/manage-users
```

### **Switch User Profiles** (Admin Only)
```javascript
// In dashboard dropdown
"Switch to Ranjeeth (Admin)" - Full admin access
"Switch to Demo (User)" - Regular user experience
```

### **Change User Plans** (Admin Only)
```bash
# Access user management
URL: /admin/manage-users

# Select user and new plan
# Click "Change Plan" button
```

---

## 🔧 Troubleshooting

### **Common Issues**

| Problem | Solution |
|---------|----------|
| Can't access admin | Login as `ranjeeth_ap@outlook.com` |
| Plan selection not working | Check browser console, clear cache |
| User switching not available | Only admin users can switch |
| Feature access denied | Check subscription tier |

### **Debug Commands**
```javascript
// Check current user
console.log(localStorage.getItem('userEmail'));

// Check current plan
console.log(localStorage.getItem('userPlan'));

// Test admin access
curl http://localhost:3000/api/admin/stats
```

---

## 📞 Support Contacts

| Support Level | Available For | Contact Method |
|---------------|---------------|----------------|
| Community | All users | Platform forums |
| Email | INDIVIDUAL+ | support@forge.com |
| Priority | STARTUP+ | Priority queue |
| Dedicated | BUSINESS+ | Dedicated support |
| 24/7 | ENTERPRISE | Phone + email |

---

## 🎯 Quick Actions

### **For New Users**
1. Go to `/sign-up`
2. Select plan during registration
3. Complete profile setup
4. Start browsing projects

### **For Admin Users**
1. Login with `ranjeeth_ap@outlook.com`
2. Access `/admin` for analytics
3. Use `/admin/manage-users` for user management
4. Switch profiles for testing

### **For Plan Upgrades**
1. Admin: Use `/admin/manage-users`
2. Select user and new plan
3. Click "Change Plan"
4. User gets immediate access

---

**📖 Full Documentation**: See `USER_ROLES_AND_PRIVILEGES.md` for complete details  
**🆘 Need Help?**: Contact admin at `ranjeeth_ap@outlook.com`
