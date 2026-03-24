// Re-export shared types
export type { BaseProps } from "./types";

// Re-export hooks
export { useDarkMode } from "./hooks/useDarkMode";
export { useClickOutside } from "./hooks/useClickOutside";

// Re-export all components by category
export { Heading, Text, Label, Caption, Code, Link, Blockquote, List, Kbd, Overline } from "./typography";
export { Button, IconButton, LinkButton, ButtonGroup } from "./buttons";
export { Card, Surface, Divider, Accordion, ScrollArea } from "./surfaces";
export { Input, SearchInput, Textarea, Select, SearchableSelect, PasswordInput, NumberInput, FormGroup } from "./inputs";
export { Toggle, Checkbox, Radio, SegmentedControl, Slider } from "./controls";
export { Box, Stack, Inline, Center, Spacer, Grid } from "./layout";
export { Spinner, Progress, Skeleton, Modal, Overlay, Tooltip, Alert, Toast, ConfirmDialog } from "./feedback";
export { Badge, Tag, Avatar, ColorSwatch, Table, Stat, EmptyState } from "./data";
export { TabBar, PillTabs, NavItem, Breadcrumb, Pagination, Stepper, BackToTop } from "./navigation";
export { Image, Icon } from "./media";

// Import all components for the PRIMITIVE_MAP
import { Heading } from "./typography/Heading";
import { Text } from "./typography/Text";
import { Label } from "./typography/Label";
import { Caption } from "./typography/Caption";
import { Code } from "./typography/Code";
import { Link } from "./typography/Link";
import { Button } from "./buttons/Button";
import { IconButton } from "./buttons/IconButton";
import { LinkButton } from "./buttons/LinkButton";
import { Card } from "./surfaces/Card";
import { Surface } from "./surfaces/Surface";
import { Divider } from "./surfaces/Divider";
import { Input } from "./inputs/Input";
import { SearchInput } from "./inputs/SearchInput";
import { Textarea } from "./inputs/Textarea";
import { Toggle } from "./controls/Toggle";
import { Checkbox } from "./controls/Checkbox";
import { Radio } from "./controls/Radio";
import { Select } from "./inputs/Select";
import { SearchableSelect } from "./inputs/SearchableSelect";
import { SegmentedControl } from "./controls/SegmentedControl";
import { Slider } from "./controls/Slider";
import { Box } from "./layout/Box";
import { Stack } from "./layout/Stack";
import { Inline } from "./layout/Inline";
import { Center } from "./layout/Center";
import { Spacer } from "./layout/Spacer";
import { Grid } from "./layout/Grid";
import { Spinner } from "./feedback/Spinner";
import { Progress } from "./feedback/Progress";
import { Skeleton } from "./feedback/Skeleton";
import { Badge } from "./data/Badge";
import { Tag } from "./data/Tag";
import { Avatar } from "./data/Avatar";
import { TabBar } from "./navigation/TabBar";
import { PillTabs } from "./navigation/PillTabs";
import { NavItem } from "./navigation/NavItem";
import { Breadcrumb } from "./navigation/Breadcrumb";
import { Pagination } from "./navigation/Pagination";
import { Stepper } from "./navigation/Stepper";
import { BackToTop } from "./navigation/BackToTop";
import { Accordion } from "./surfaces/Accordion";
import { ScrollArea } from "./surfaces/ScrollArea";
import { Image } from "./media/Image";
import { Icon } from "./media/Icon";
import { Blockquote } from "./typography/Blockquote";
import { List } from "./typography/List";
import { Kbd } from "./typography/Kbd";
import { Overline } from "./typography/Overline";
import { ColorSwatch } from "./data/ColorSwatch";
import { Overlay } from "./feedback/Overlay";
import { Modal } from "./feedback/Modal";
import { Tooltip } from "./feedback/Tooltip";
import { Alert } from "./feedback/Alert";
import { Toast } from "./feedback/Toast";
import { ConfirmDialog } from "./feedback/ConfirmDialog";
import { Table } from "./data/Table";
import { Stat } from "./data/Stat";
import { EmptyState } from "./data/EmptyState";
import { ButtonGroup } from "./buttons/ButtonGroup";
import { PasswordInput } from "./inputs/PasswordInput";
import { NumberInput } from "./inputs/NumberInput";
import { FormGroup } from "./inputs/FormGroup";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PRIMITIVE_MAP: Record<string, React.ComponentType<any>> = {
  // Typography
  heading: Heading,
  text: Text,
  label: Label,
  caption: Caption,
  code: Code,
  link: Link,
  // Buttons
  button: Button,
  "icon-button": IconButton,
  "link-button": LinkButton,
  // Surfaces
  card: Card,
  surface: Surface,
  divider: Divider,
  // Form
  input: Input,
  "search-input": SearchInput,
  textarea: Textarea,
  toggle: Toggle,
  checkbox: Checkbox,
  radio: Radio,
  select: Select,
  "searchable-select": SearchableSelect,
  "segmented-control": SegmentedControl,
  slider: Slider,
  // Layout
  box: Box,
  stack: Stack,
  inline: Inline,
  center: Center,
  spacer: Spacer,
  grid: Grid,
  // Feedback
  spinner: Spinner,
  progress: Progress,
  skeleton: Skeleton,
  // Data Display
  badge: Badge,
  tag: Tag,
  avatar: Avatar,
  // Navigation
  "tab-bar": TabBar,
  "pill-tabs": PillTabs,
  "nav-item": NavItem,
  breadcrumb: Breadcrumb,
  pagination: Pagination,
  stepper: Stepper,
  "back-to-top": BackToTop,
  // Surfaces
  accordion: Accordion,
  "scroll-area": ScrollArea,
  // Media
  image: Image,
  icon: Icon,
  // Typography (additional)
  blockquote: Blockquote,
  list: List,
  kbd: Kbd,
  overline: Overline,
  // Data Display (additional)
  "color-swatch": ColorSwatch,
  // Overlays
  overlay: Overlay,
  modal: Modal,
  tooltip: Tooltip,
  // Feedback (additional)
  alert: Alert,
  toast: Toast,
  "confirm-dialog": ConfirmDialog,
  // Data Display (new)
  table: Table,
  stat: Stat,
  "empty-state": EmptyState,
  // Buttons (additional)
  "button-group": ButtonGroup,
  // Inputs (additional)
  "password-input": PasswordInput,
  "number-input": NumberInput,
  "form-group": FormGroup,
};
