import {
  SEO_AUDIT_CHECKLIST,
  generateAuditReport,
  getAuditItemsByCategory,
  getAuditItemsByPriority,
  getAuditCategories,
} from '../src/index';

console.log('=== SEO Audit Checklist Demo ===\n');

// Display all categories
console.log('Available audit categories:');
const categories = getAuditCategories();
categories.forEach(category => {
  console.log(`- ${category}`);
});

console.log('\n=== High Priority Items ===');
const highPriorityItems = getAuditItemsByPriority('high');
highPriorityItems.forEach(item => {
  console.log(`🔴 ${item.title}`);
  console.log(`   ${item.description}`);
  console.log(`   Category: ${item.category}\n`);
});

console.log('=== Medium Priority Items ===');
const mediumPriorityItems = getAuditItemsByPriority('medium');
mediumPriorityItems.forEach(item => {
  console.log(`🟡 ${item.title}`);
  console.log(`   ${item.description}`);
  console.log(`   Category: ${item.category}\n`);
});

console.log('=== Meta Tags Category Items ===');
const metaTagsItems = getAuditItemsByCategory('Meta Tags');
metaTagsItems.forEach(item => {
  const priorityIcon = item.priority === 'high' ? '🔴' : item.priority === 'medium' ? '🟡' : '🟢';
  console.log(`${priorityIcon} ${item.title}`);
  console.log(`   ${item.description}\n`);
});

console.log('=== Shopify Specific Items ===');
const shopifyItems = getAuditItemsByCategory('Shopify');
shopifyItems.forEach(item => {
  const priorityIcon = item.priority === 'high' ? '🔴' : item.priority === 'medium' ? '🟡' : '🟢';
  console.log(`${priorityIcon} ${item.title}`);
  console.log(`   ${item.description}\n`);
});

console.log('=== Complete Audit Report ===\n');
const auditReport = generateAuditReport();
console.log(auditReport);

// Example: Create a custom audit implementation
console.log('\n=== Custom Audit Implementation Example ===\n');

interface AuditResult {
  item: typeof SEO_AUDIT_CHECKLIST[0];
  status: 'pass' | 'fail' | 'warning' | 'not-checked';
  notes?: string;
}

// Simulate an audit
function performAudit(): AuditResult[] {
  const results: AuditResult[] = [];
  
  // Simulate checking some items
  SEO_AUDIT_CHECKLIST.forEach(item => {
    let status: AuditResult['status'] = 'not-checked';
    let notes = '';
    
    // Simulate some results
    switch (item.id) {
      case 'title-tag':
        status = 'pass';
        notes = 'Title tag present and under 60 characters';
        break;
      case 'meta-description':
        status = 'pass';
        notes = 'Meta description present and under 160 characters';
        break;
      case 'ssl-certificate':
        status = 'pass';
        notes = 'HTTPS enabled';
        break;
      case 'page-speed':
        status = 'warning';
        notes = 'Page loads in 2.8 seconds - could be improved';
        break;
      case 'structured-data':
        status = 'fail';
        notes = 'No structured data found on the page';
        break;
      case 'mobile-friendly':
        status = 'pass';
        notes = 'Responsive design detected';
        break;
      default:
        status = 'not-checked';
        notes = 'Not tested in this example';
    }
    
    results.push({ item, status, notes });
  });
  
  return results;
}

const auditResults = performAudit();

// Display results by status
const statusIcons = {
  pass: '✅',
  fail: '❌',
  warning: '⚠️',
  'not-checked': '⏸️',
};

console.log('Audit Results Summary:');
const summary = auditResults.reduce((acc, result) => {
  acc[result.status] = (acc[result.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

Object.entries(summary).forEach(([status, count]) => {
  console.log(`${statusIcons[status as keyof typeof statusIcons]} ${status}: ${count} items`);
});

console.log('\nDetailed Results:');
auditResults.forEach(result => {
  if (result.status !== 'not-checked') {
    const icon = statusIcons[result.status];
    console.log(`${icon} ${result.item.title} (${result.item.priority} priority)`);
    console.log(`   ${result.notes}`);
    console.log('');
  }
});

// Generate action items
console.log('=== Action Items (Failed & Warning Items) ===\n');
const actionItems = auditResults.filter(r => r.status === 'fail' || r.status === 'warning');
actionItems.forEach((result, index) => {
  console.log(`${index + 1}. ${result.item.title}`);
  console.log(`   Priority: ${result.item.priority.toUpperCase()}`);
  console.log(`   Issue: ${result.notes}`);
  console.log(`   Action: ${result.item.description}`);
  console.log('');
});

console.log('🎯 Focus on high-priority failed items first for maximum SEO impact!');