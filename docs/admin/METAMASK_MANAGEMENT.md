# MetaMask Connection Management for Administrators

This guide explains how to use the OrbitYield admin interface to manage MetaMask wallet connections, review disconnection requests, and maintain the security of user wallet connections.

## Overview

The MetaMask connection management system provides administrators with tools to:

1. View all active MetaMask connections
2. Process wallet disconnection requests
3. Audit connection history
4. Manage security notifications

## Accessing the Admin Interface

1. Navigate to [Admin Dashboard](https://app.orbityield.cc/admin)
2. Log in with your admin credentials
3. Select "MetaMask Management" from the sidebar menu

## Dashboard Overview

The MetaMask admin dashboard displays:

- Total active connections
- Pending disconnection requests (with count badge)
- Recent connection activities
- Flagged connections (suspicious activity)

## Managing Disconnection Requests

### Viewing Requests

1. Go to the "Pending Requests" tab
2. Each request includes:
   - User email
   - Wallet address
   - Connection timestamp
   - Disconnection reason
   - Request date

### Processing Requests

To approve a disconnection request:

1. Review the request details
2. Click "Approve" to process the request
3. Add an optional note for internal tracking
4. Confirm the action

The system will:
- Update the connection status
- Send a confirmation email to the user
- Log the action in the admin audit trail

To reject a disconnection request:

1. Click "Reject"
2. Provide a reason for rejection
3. Confirm the action

The system will:
- Keep the connection active
- Notify the user of the rejection with the provided reason
- Log the action in the admin audit trail

## Connection History

The "Connection History" section provides:

- Complete history of all MetaMask connections
- Filtering by date range, status, and wallet address
- Export functionality (CSV/PDF)
- Detailed activity logs per connection

## Security Features

### Manual Security Review

For connections flagged by the system:

1. Review the flagged connection details
2. Check the suspicious activity indicators
3. Take appropriate action:
   - Clear flag (false positive)
   - Contact user (for verification)
   - Force disconnect (security risk)

### Bulk Actions

For system maintenance:

- **Audit All**: Trigger a security review of all connections
- **Notify Users**: Send batch notifications to connected users
- **Export Data**: Generate reports for compliance purposes

## Email Notifications

The system sends the following email notifications:

1. **To Users**:
   - Disconnection request received
   - Request approved/rejected
   - Security alerts

2. **To Admins**:
   - New disconnection requests
   - Security warnings
   - Weekly connection summary

## Best Practices

1. **Response Time**: Process disconnection requests within 24-48 hours
2. **Documentation**: Add detailed notes to rejection reasons
3. **Verification**: For suspicious requests, use secondary verification channels
4. **Regular Audits**: Review connection logs weekly
5. **User Communication**: Maintain clear communication about request status

## Troubleshooting

### Common Issues

1. **Email Delivery Problems**:
   - Check spam filters
   - Verify email templates
   - Test notification system

2. **User Complaints**:
   - Prioritize urgent security concerns
   - Document all user interactions
   - Escalate unresolved issues

3. **Data Inconsistencies**:
   - Run database validation scripts
   - Check for orphaned connections
   - Verify MongoDB indexes

## Support Resources

For technical support with the admin interface:

- Internal Knowledge Base: [admin.orbityield.cc/kb](https://admin.orbityield.cc/kb)
- Admin Support: admin-support@orbityield.cc
- Emergency Hotline: +1-555-ORB-ADMIN
