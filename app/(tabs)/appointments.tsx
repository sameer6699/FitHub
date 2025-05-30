import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform, Animated, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, ChevronRight, Star, MessageCircle } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import Layout from '@/constants/Layout';

// Add these interfaces before the THERAPISTS constant
interface Therapist {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  location: string;
  availability: string[];
  nextAvailable: string;
}

interface Appointment {
  id: string;
  type: string;
  date: string;
  time: string;
  therapist: string;
  location: string;
}

// Mock data for therapists
const THERAPISTS = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Sports Physiotherapy',
    experience: '8 years',
    rating: 4.8,
    reviewCount: 124,
    imageUrl: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg',
    location: 'Main Clinic, Room 3',
    availability: ['Mon', 'Wed', 'Fri'],
    nextAvailable: '2024-03-25',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Rehabilitation',
    experience: '6 years',
    rating: 4.9,
    reviewCount: 98,
    imageUrl: 'https://images.pexels.com/photos/3845811/pexels-photo-3845811.jpeg',
    location: 'Downtown Branch',
    availability: ['Tue', 'Thu', 'Sat'],
    nextAvailable: '2024-03-26',
  },
  {
    id: '3',
    name: 'Dr. Robert Williams',
    specialization: 'Sports Medicine',
    experience: '10 years',
    rating: 4.7,
    reviewCount: 156,
    imageUrl: 'https://images.pexels.com/photos/3845813/pexels-photo-3845813.jpeg',
    location: 'Sports Medicine Center',
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    nextAvailable: '2024-03-24',
  },
];

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

const AppointmentsScreen = () => {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('therapists');
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderTherapistItem = ({ item }: { item: Therapist }) => (
    <TouchableOpacity style={[styles.therapistCard, { backgroundColor: colors.card }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.therapistImage} />
      <View style={styles.therapistInfo}>
        <View style={styles.therapistHeader}>
          <View>
            <Text style={[styles.therapistName, { color: colors.text }]}>{item.name}</Text>
            <Text style={[styles.therapistSpecialization, { color: colors.text + '99' }]}>{item.specialization}</Text>
          </View>
          <View style={[styles.ratingContainer, { backgroundColor: colors.accent + '20' }]}>
            <Star size={16} color={colors.accent} fill={colors.accent} />
            <Text style={[styles.ratingText, { color: colors.accent }]}>{item.rating}</Text>
            <Text style={[styles.reviewCount, { color: colors.text + '99' }]}>({item.reviewCount})</Text>
          </View>
        </View>
        
        <View style={styles.therapistDetails}>
          <View style={styles.detailRow}>
            <Clock size={16} color={colors.text + '99'} />
            <Text style={[styles.detailText, { color: colors.text + '99' }]}>{item.experience} experience</Text>
          </View>
          
          <View style={styles.detailRow}>
            <MapPin size={16} color={colors.text + '99'} />
            <Text style={[styles.detailText, { color: colors.text + '99' }]}>{item.location}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <CalendarIcon size={16} color={colors.text + '99'} />
            <Text style={[styles.detailText, { color: colors.text + '99' }]}>Available: {item.availability.join(', ')}</Text>
          </View>
        </View>
        
        <View style={styles.therapistActions}>
          <TouchableOpacity style={styles.reviewButton}>
            <MessageCircle size={16} color={colors.accent} />
            <Text style={[styles.reviewButtonText, { color: colors.accent }]}>View Reviews</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.bookButton, { backgroundColor: colors.accent }]}>
            <Text style={[styles.bookButtonText, { color: colors.text }]}>Book Appointment</Text>
            <Text style={[styles.nextAvailable, { color: colors.text + '99' }]}>Next: {formatDate(item.nextAvailable)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderAppointmentItem = ({ item }: { item: Appointment }) => (
    <TouchableOpacity style={[styles.appointmentCard, { backgroundColor: colors.card }]}>
      <View style={styles.appointmentHeader}>
        <Text style={[styles.appointmentType, { color: colors.text }]}>{item.type}</Text>
        <View style={[styles.statusBadge, { backgroundColor: colors.accent + '20' }]}>
          <Text style={[styles.statusText, { color: colors.accent }]}>
            {activeTab === 'upcoming' ? 'Confirmed' : 'Completed'}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentDetails}>
        <View style={styles.detailRow}>
          <CalendarIcon size={16} color={colors.text + '99'} />
          <Text style={[styles.detailText, { color: colors.text + '99' }]}>{formatDate(item.date)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Clock size={16} color={colors.text + '99'} />
          <Text style={[styles.detailText, { color: colors.text + '99' }]}>{item.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <User size={16} color={colors.text + '99'} />
          <Text style={[styles.detailText, { color: colors.text + '99' }]}>{item.therapist}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MapPin size={16} color={colors.text + '99'} />
          <Text style={[styles.detailText, { color: colors.text + '99' }]}>{item.location}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentFooter}>
        {activeTab === 'upcoming' ? (
          <>
            <TouchableOpacity style={[styles.appointmentButton, { backgroundColor: colors.card }]}>
              <Text style={[styles.rescheduleText, { color: colors.accent }]}>Reschedule</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.appointmentButton, styles.cancelButton, { backgroundColor: colors.card }]}>
              <Text style={[styles.cancelText, { color: colors.text + '99' }]}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={[styles.bookAgainButton, { backgroundColor: colors.accent }]}>
            <Text style={[styles.bookAgainText, { color: colors.text }]}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colors.background === '#FFFFFF' ? 'dark' : 'light'} />
      
      <View style={styles.headerSection}>
        <View>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Appointments</Text>
          <Text style={[styles.pageSubtitle, { color: colors.text + '99' }]}>Book your therapy sessions</Text>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            { backgroundColor: colors.card },
            activeTab === 'therapists' && { backgroundColor: colors.accent }
          ]} 
          onPress={() => setActiveTab('therapists')}
        >
          <Text style={[
            styles.tabButtonText, 
            { color: colors.text },
            activeTab === 'therapists' && { color: colors.text }
          ]}>
            Therapists
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            { backgroundColor: colors.card },
            activeTab === 'upcoming' && { backgroundColor: colors.accent }
          ]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[
            styles.tabButtonText, 
            { color: colors.text },
            activeTab === 'upcoming' && { color: colors.text }
          ]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.tabButton, 
            { backgroundColor: colors.card },
            activeTab === 'past' && { backgroundColor: colors.accent }
          ]} 
          onPress={() => setActiveTab('past')}
        >
          <Text style={[
            styles.tabButtonText, 
            { color: colors.text },
            activeTab === 'past' && { color: colors.text }
          ]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'therapists' ? (
        <FlatList
          data={THERAPISTS}
          keyExtractor={(item) => item.id}
          renderItem={renderTherapistItem}
          contentContainerStyle={styles.therapistsList}
        />
      ) : (
        <FlatList
          data={activeTab === 'upcoming' ? UPCOMING_APPOINTMENTS : PAST_APPOINTMENTS}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointmentItem}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text + '99' }]}>No {activeTab} appointments</Text>
            </View>
          }
          contentContainerStyle={styles.appointmentsList}
        />
      )}
    </View>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  pageSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginTop: 2,
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
  tabButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  therapistsList: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  therapistCard: {
    borderRadius: Layout.borderRadius.medium,
    marginBottom: Layout.spacing.m,
    overflow: 'hidden',
  },
  therapistImage: {
    width: '100%',
    height: 200,
  },
  therapistInfo: {
    padding: Layout.spacing.m,
  },
  therapistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.m,
  },
  therapistName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginBottom: 4,
  },
  therapistSpecialization: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginLeft: 4,
  },
  reviewCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: 4,
  },
  therapistDetails: {
    marginBottom: Layout.spacing.m,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.s,
  },
  detailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginLeft: Layout.spacing.s,
  },
  therapistActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.small,
  },
  reviewButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginLeft: Layout.spacing.xs,
  },
  bookButton: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    paddingHorizontal: Layout.spacing.m,
    borderRadius: Layout.borderRadius.small,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  },
  nextAvailable: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 2,
  },
  appointmentsList: {
    paddingHorizontal: Layout.spacing.l,
    paddingBottom: Layout.spacing.l,
  },
  appointmentCard: {
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
  },
  appointmentType: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: Layout.spacing.s,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.small,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  appointmentDetails: {
    padding: Layout.spacing.m,
  },
  appointmentFooter: {
    flexDirection: 'row',
    padding: Layout.spacing.m,
    borderTopWidth: 1,
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
  },
  cancelButton: {
    marginRight: 0,
  },
  cancelText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  bookAgainButton: {
    flex: 1,
    paddingVertical: Layout.spacing.s,
    alignItems: 'center',
    borderRadius: Layout.borderRadius.small,
  },
  bookAgainText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  emptyContainer: {
    padding: Layout.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
});