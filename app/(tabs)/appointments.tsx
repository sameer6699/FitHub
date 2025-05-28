import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

// Mock data for appointments
const UPCOMING_APPOINTMENTS = [
  {
    id: '1',
    type: 'Physiotherapy Session',
    date: '2025-06-15',
    time: '10:00 AM',
    therapist: 'Dr. Sarah Johnson',
    location: 'Main Clinic, Room 3',
  },
  {
    id: '2',
    type: 'Follow-up Consultation',
    date: '2025-06-22',
    time: '2:30 PM',
    therapist: 'Dr. Michael Chen',
    location: 'Downtown Branch',
  },
];

const PAST_APPOINTMENTS = [
  {
    id: '3',
    type: 'Initial Assessment',
    date: '2025-05-20',
    time: '11:15 AM',
    therapist: 'Dr. Sarah Johnson',
    location: 'Main Clinic, Room 3',
  },
  {
    id: '4',
    type: 'Sports Rehabilitation',
    date: '2025-05-05',
    time: '3:00 PM',
    therapist: 'Dr. Robert Williams',
    location: 'Sports Medicine Center',
  },
];

// Mock data for available slots
const AVAILABLE_SLOTS = [
  { id: '1', date: '2025-06-18', timeSlots: ['9:00 AM', '11:30 AM', '2:00 PM'] },
  { id: '2', date: '2025-06-19', timeSlots: ['10:00 AM', '1:30 PM', '4:00 PM'] },
  { id: '3', date: '2025-06-20', timeSlots: ['9:30 AM', '12:00 PM', '3:30 PM'] },
];

export default function AppointmentsScreen() {
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const renderAppointmentItem = ({ item }) => (
    <TouchableOpacity style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.appointmentType}>{item.type}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>
            {activeTab === 'upcoming' ? 'Confirmed' : 'Completed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <CalendarIcon size={16} color={Colors.dark.text + '99'} />
          <Text style={styles.detailText}>{formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color={Colors.dark.text + '99'} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <User size={16} color={Colors.dark.text + '99'} />
          <Text style={styles.detailText}>{item.therapist}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color={Colors.dark.text + '99'} />
          <Text style={styles.detailText}>{item.location}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentFooter}>
        {activeTab === 'upcoming' ? (
          <>
            <TouchableOpacity style={styles.appointmentButton}>
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.appointmentButton, styles.cancelButton]}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.bookAgainButton}>
            <Text style={styles.bookAgainText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  
  const renderTimeSlot = (date, slot) => (
    <TouchableOpacity key={slot} style={styles.timeSlot}>
      <Text style={styles.timeSlotText}>{slot}</Text>
    </TouchableOpacity>
  );
  
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.headerSection}>
        <View>
          <Text style={styles.pageTitle}>Your Appointments</Text>
          <Text style={styles.pageSubtitle}>Manage your therapy sessions</Text>
        </View>
        
        <TouchableOpacity style={styles.newAppointmentButton}>
          <Plus size={20} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'upcoming' && styles.activeTabButton]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text 
            style={[styles.tabButtonText, activeTab === 'upcoming' && styles.activeTabText]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'past' && styles.activeTabButton]} 
          onPress={() => setActiveTab('past')}
        >
          <Text 
            style={[styles.tabButtonText, activeTab === 'past' && styles.activeTabText]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={activeTab === 'upcoming' ? UPCOMING_APPOINTMENTS : PAST_APPOINTMENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderAppointmentItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeTab} appointments</Text>
          </View>
        }
        contentContainerStyle={styles.appointmentsList}
      />
      
      {activeTab === 'upcoming' && (
        <View style={styles.availableSlotsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View Calendar</Text>
              <ChevronRight size={16} color={Colors.dark.accent} />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.slotsList}>
            {AVAILABLE_SLOTS.map((day) => (
              <View key={day.id} style={styles.daySlots}>
                <Text style={styles.dayText}>{formatDate(day.date)}</Text>
                <View style={styles.timeSlotsRow}>
                  {day.timeSlots.map((slot) => renderTimeSlot(day.date, slot))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.l,
    paddingVertical: Layout.spacing.m,
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.dark.text,
  },
  pageSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '80',
    marginTop: 2,
  },
  newAppointmentButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.l,
    marginBottom: Layout.spacing.m,
  },
  tabButton: {
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    marginRight: Layout.spacing.m,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: Colors.dark.accent,
  },
  tabButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.dark.text + '80',
  },
  activeTabText: {
    color: Colors.dark.text,
  },
  appointmentsList: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  appointmentCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  appointmentType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: Colors.dark.text,
  },
  statusBadge: {
    backgroundColor: Colors.dark.accent + '30',
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: Colors.dark.accent,
  },
  appointmentDetails: {
    padding: Layout.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.dark.text + '99',
    marginLeft: Layout.spacing.s,
  },
  appointmentFooter: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  appointmentButton: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    marginRight: Layout.spacing.s,
  },
  rescheduleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
  },
  cancelButton: {
    marginRight: 0,
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.error,
  },
  bookAgainButton: {
    flex: 1,
    backgroundColor: Colors.dark.accent,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.small,
  },
  bookAgainText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
  },
  emptyContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: Colors.dark.text + '80',
  },
  availableSlotsContainer: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.m,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: Colors.dark.text,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.accent,
    marginRight: 2,
  },
  slotsList: {
    maxHeight: 200,
  },
  daySlots: {
    marginBottom: Layout.spacing.m,
  },
  dayText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.dark.text,
    marginBottom: Layout.spacing.s,
  },
  timeSlotsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    backgroundColor: Colors.dark.card,
    paddingHorizontal: Layout.spacing.m,
    paddingVertical: Layout.spacing.s,
    borderRadius: Layout.borderRadius.small,
    marginRight: Layout.spacing.s,
    marginBottom: Layout.spacing.s,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  timeSlotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.dark.text,
  },
});